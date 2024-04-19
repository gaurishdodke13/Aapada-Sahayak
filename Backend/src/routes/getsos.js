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
const isAuthenticated_1 = __importDefault(require("../utils/isAuthenticated"));
const isRescueAgency_1 = __importDefault(require("../utils/isRescueAgency"));
const rescue_sos_1 = __importDefault(require("../models/rescue_sos"));
const router = (0, express_1.Router)();
// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated_1.default, isRescueAgency_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const sos = (yield rescue_sos_1.default.find({ rescue_id: req['user'].id }).populate('sos_id')).map(sos => sos.sos_id).filter(x => x !== null);
        console.log(sos);
        res.json(sos);
    }
}));
exports.default = router;
