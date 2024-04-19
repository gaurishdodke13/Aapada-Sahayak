"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// import { RescueAgency } from '../types/schema';
const RescueSosSchema = new mongoose_1.Schema({
    rescue_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'RescueAgency',
        required: true,
    },
    sos_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Sos',
        required: true,
    },
}, {
    timestamps: true,
});
const RescueSos = (0, mongoose_1.model)('RescueSos', RescueSosSchema, 'rescue-sos');
exports.default = RescueSos;
