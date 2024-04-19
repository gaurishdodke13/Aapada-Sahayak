"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'RescueAgency',
        required: true,
    },
}, {
    timestamps: true,
});
const Message = mongoose_1.default.model('Message', messageSchema);
exports.default = Message;
