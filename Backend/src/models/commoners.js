"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const commonerSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
commonerSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
const commoner = mongoose_1.default.model('Commoner', commonerSchema);
exports.default = commoner;
