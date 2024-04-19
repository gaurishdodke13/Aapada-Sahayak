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
exports.updateRequest = exports.addRequest = void 0;
const request_1 = __importDefault(require("../models/request"));
const addRequest = (req_data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield request_1.default.create(Object.assign(Object.assign({}, req_data), { status: 'Pending' }));
    const request = yield res.populate('rescue_requester_id');
    return request;
});
exports.addRequest = addRequest;
const updateRequest = (reqId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    // const req = await Request.findById(reqId);
    // const x = await Resource.find({ agency_id: reqId });
    const res = yield request_1.default.findByIdAndUpdate(reqId, { status: newStatus });
    return res;
});
exports.updateRequest = updateRequest;
