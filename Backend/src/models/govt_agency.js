"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GovtAgencySchema = new mongoose_1.Schema({
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
});
GovtAgencySchema.index({ location: '2dsphere' });
const GovtAgency = (0, mongoose_1.model)('GovernmentAgency', GovtAgencySchema, 'government-agencies');
exports.default = GovtAgency;
