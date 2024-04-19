"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sos_1 = __importDefault(require("../models/sos"));
const rescue_agency_1 = __importDefault(require("../models/rescue_agency"));
const rescue_sos_1 = __importDefault(require("../models/rescue_sos"));
const argon2_1 = __importDefault(require("argon2"));
const commoners_1 = __importDefault(require("../models/commoners"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeOfDisaster, latitude, longitude, } = req.body;
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    const hash = ipAddress ? yield argon2_1.default.hash(ipAddress) : '';
    let createSos = false;
    if (req.cookies['apadarelief']) {
        res.send({
            error: true,
            meesage: 'You have already sent an SOS within the past 24 hours.',
        });
    }
    else {
        if (ipAddress) {
            const temp = yield commoners_1.default.findOne({ token: hash });
            if (temp) {
                res.send({
                    error: true,
                    meesage: 'You have already sent an SOS within the past 24 hours.',
                });
            }
            else {
                createSos = true;
            }
        }
        else {
            createSos = true;
        }
    }
    if (createSos) {
        const sos = yield sos_1.default.create({
            typeOfDisaster,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude],
            },
        });
        const agencies = yield rescue_agency_1.default.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 3000000,
                },
            },
        });
        agencies.forEach((agency) => __awaiter(void 0, void 0, void 0, function* () {
            yield rescue_sos_1.default.create({ rescue_id: agency._id, sos_id: sos._id });
        }));
        res.cookie('apadarelief', {
            token: hash,
        }, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none',
        });
        res.json({ error: false, message: 'Sos sent successfully' });
    }
}));
exports.default = router;
