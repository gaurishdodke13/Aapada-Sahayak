"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    hash: { type: String, required: true },
    role: {
        type: Number,
        required: true,
        validate: (role) => role == 0 || role == 1,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('User', UserSchema, 'users');
exports.default = User;
