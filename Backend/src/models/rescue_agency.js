"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RescueAgencySchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    phone: [{ type: String }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['NDRF', 'SDRF', 'DDRF', 'NGO'],
    },
}, {
    timestamps: true,
});
RescueAgencySchema.index({ location: '2dsphere' });
const RescueAgency = (0, mongoose_1.model)('RescueAgency', RescueAgencySchema, 'rescue-agencies');
exports.default = RescueAgency;
