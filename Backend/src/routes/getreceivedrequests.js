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
const isRescueAgency_1 = __importDefault(require("../utils/isRescueAgency"));
const router = (0, express_1.Router)();
// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated_1.default, isRescueAgency_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const requests = yield request_1.default.find({ requestee_id: req.user.id }).populate('govt_requester_id rescue_requester_id requestee_id');
    // const requests = await Request.aggregate([
    //   {
    //     $match: {
    //       requestee_id: req.user.id,
    //     },
    //   },
    // {
    //   $lookup: {
    //     from: 'users',
    //     localField: 'govt_requester_id',
    //     foreignField: '_id',
    //     as: 'govt_requester',
    //   },
    // },
    // {
    //   $lookup: {
    //     from: 'users',
    //     localField: 'rescue_requester_id',
    //     foreignField: '_id',
    //     as: 'rescue_requester',
    //   },
    // },
    // ]);
    // console.log(requests);
    res.json({ requests: requests });
}));
exports.default = router;
