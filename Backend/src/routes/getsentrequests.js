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
const request_1 = __importDefault(require("../models/request"));
const router = (0, express_1.Router)();
router.get('/', isAuthenticated_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const requests = req.user.role === 0
        ? yield request_1.default.find({ govt_requester_id: req.user.id }).populate('rescue_requester_id requestee_id')
        : yield request_1.default.find({ rescue_requester_id: req.user.id }).populate('rescue_requester_id requestee_id');
    // let requests;
    // if (req.user.role === 1) {
    //   requests = await Request.aggregate([
    //     {
    //       $match: { rescue_requester_id: req.user.id },
    //     },
    //     {
    //       $lookup: {
    //         from: 'users',
    //         localField: 'requestee_id',
    //         foreignField: '_id',
    //         as: 'requestee_id',
    //       },
    //     },
    //   ]);
    // } else {
    //   requests = await Request.aggregate([
    //     {
    //       $match: { govt_requester_id: req.user.id },
    //     },
    //     {
    //       $lookup: {
    //         from: 'users',
    //         localField: 'requestee_id',
    //         foreignField: '_id',
    //         as: 'requestee_id',
    //       },
    //     },
    //   ]);
    // }
    // console.log(requests);
    res.json({ requests: requests });
}));
exports.default = router;
