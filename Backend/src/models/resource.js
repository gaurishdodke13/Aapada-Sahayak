"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ResourceSchema = new mongoose_1.Schema({
    agency_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'RescueAgency',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
    },
}, {
    timestamps: true,
});
const Resource = (0, mongoose_1.model)('Resource', ResourceSchema, 'resources');
exports.default = Resource;
