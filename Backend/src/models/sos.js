"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SosSchema = new mongoose_1.Schema({
    typeOfDisaster: {
        type: String,
        enum: [
            'Earthquakes',
            'floods',
            'Thunderstorm',
            'Tornado',
            'Cyclone',
            'Industrial accident',
            'Heatwave',
            'Landslide',
            'Forest fire',
        ],
        required: true,
    },
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
SosSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
SosSchema.index({ location: '2dsphere' });
const Sos = (0, mongoose_1.model)('Sos', SosSchema, 'sos');
exports.default = Sos;
