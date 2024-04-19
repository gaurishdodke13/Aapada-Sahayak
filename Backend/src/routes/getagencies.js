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
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const rescue_agency_1 = __importDefault(require("../models/rescue_agency"));
const resource_1 = __importDefault(require("../models/resource"));
const router = (0, express_1.Router)();
// get all agencies within a particular radius (in meters)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, radius } = req.query;
    console.log(req.query);
    if (typeof latitude !== 'string' ||
        typeof longitude !== 'string' ||
        (typeof radius !== 'string' && typeof radius !== 'undefined')) {
        res.json({ error: true, message: 'Invalid query parameters' });
    }
    else {
        const lat = Number(latitude);
        const long = Number(longitude);
        const rad = radius ? Number(radius) : 500000;
        console.log(lat, long, rad);
        const agencies = yield rescue_agency_1.default.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [long, lat],
                    },
                    maxDistance: rad,
                    spherical: true,
                    distanceField: 'distance',
                },
            },
            {
                $lookup: {
                    from: 'resources',
                    localField: '_id',
                    foreignField: 'agency_id',
                    as: 'resources',
                },
            },
        ]);
        // console.log(agencies);
        res.send(agencies);
    }
}));
router.get('/best', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resources } = req.body;
        const bestAgencies = yield resource_1.default.find({
            $and: resources.map((resource) => ({
                // resources: {
                $elemMatch: {
                    type: resource.type,
                    name: resource.name,
                    quantity: { $gte: resource.qty },
                },
                // },
            })),
        });
        return res.status(200).json(bestAgencies);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error' });
    }
}));
exports.default = router;
