"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chatSchema = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RescueAgency',
        },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    lastMsg: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
}, {
    timestamps: true,
});
const Chat = mongoose_1.default.model('Chat', chatSchema);
exports.default = Chat;
