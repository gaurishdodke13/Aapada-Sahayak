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
const request_1 = __importDefault(require("../models/request"));
const router = (0, express_1.Router)();
const permittedStatus = new Set(['approved', 'denied', 'completed', 'ongoing']);
// status = approved, denied, completed, ongoing
router.post('/', isAuthenticated_1.default, isRescueAgency_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const { _id, status } = req.body;
    if (!permittedStatus.has(status)) {
        res.json({ error: true, message: 'Invalid status' });
    }
    else {
        const request = yield request_1.default.findById(_id);
        if (request) {
            request.status = status;
            yield request.save();
            res.json({ error: false, message: 'Status updated' });
        }
    }
}));
exports.default = router;
