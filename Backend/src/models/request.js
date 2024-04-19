"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    govt_requester_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'GovernmentAgency',
    },
    rescue_requester_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'RescueAgency',
    },
    requestee_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'RescueAgency',
    },
    requested_items: [
        {
            type: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
            },
        },
    ],
    status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const DRequest = (0, mongoose_1.model)('Request', RequestSchema, 'requests');
exports.default = DRequest;
