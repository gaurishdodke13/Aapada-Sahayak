"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChat = exports.getChat = exports.sendMessage = exports.getMessages = exports.addToChat = exports.createChat = exports.chatList = void 0;
const rescue_agency_1 = __importDefault(require("../models/rescue_agency"));
const chat_1 = __importDefault(require("../models/chat"));
// import { Types } from 'mongoose';
const message_1 = __importDefault(require("../models/message"));
const mongoose_1 = require("mongoose");
const chatList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        // const user = {
        //   id: '6502e4e07334dcc0d7599107',
        //   email: 'ndrf@gov.in',
        //   role: 1,
        // };
        if (user) {
            const chats = yield chat_1.default.aggregate([
                {
                    //@ts-ignore
                    $match: { members: new mongoose_1.Types.ObjectId(user.id) },
                },
                {
                    $lookup: {
                        from: 'rescue-agencies',
                        localField: 'members',
                        foreignField: '_id',
                        as: 'members',
                    },
                },
                {
                    $lookup: {
                        from: 'messages',
                        localField: 'lastMsg',
                        foreignField: '_id',
                        as: 'lastMsg',
                    },
                },
                {
                    $unwind: {
                        path: '$lastMsg',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $sort: {
                        'lastMsg.createdAt': -1,
                    },
                },
            ]);
            return res.status(200).json(chats);
        }
        return res.status(400).json({ message: 'no user id passed' });
    }
    catch (error) {
        console.log('1st2');
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.chatList = chatList;
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const chat = yield chat_1.default.findById(chatId);
        return res.status(200).json(chat);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getChat = getChat;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const chat = yield chat_1.default.findById(chatId)
            .populate({
            path: 'messages',
            populate: {
                path: 'sender',
                model: 'RescueAgency',
            },
        })
            .populate('members')
            .catch((err) => {
            console.error(err);
        });
        return res.status(200).json(chat);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.getMessages = getMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const { chatId } = req.params;
        const user = req.user;
        if (user) {
            if (content.trim() === '') {
                return res.status(400).json({ message: 'Empty message' });
            }
            const msg = yield message_1.default.create({
                content,
                sender: user.id,
            });
            const populatedMsg = yield msg.populate('sender');
            yield chat_1.default.findByIdAndUpdate(chatId, { lastMsg: msg._id, $addToSet: { messages: msg._id } }, { new: true });
            return res.status(200).json(populatedMsg);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.sendMessage = sendMessage;
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rescue_id1, rescue_id2 } = req.body;
        const rescue1 = yield rescue_agency_1.default.findById(rescue_id1);
        const rescue2 = yield rescue_agency_1.default.findById(rescue_id2);
        if (!rescue1 || !rescue2) {
            return res.status(400).json({ message: "- agencies don't exist." });
        }
        const chat = yield chat_1.default.create({ members: [rescue_id1, rescue_id2] });
        const populatedChat = yield chat.populate('members');
        return res.status(200).json(populatedChat);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.createChat = createChat;
const addToChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rescueId, chatId } = req.body;
        const agency = yield rescue_agency_1.default.findById(rescueId);
        if (!agency) {
            return res.status(400).json({ message: "That agency doesn't exist." });
        }
        const chat = yield chat_1.default.findByIdAndUpdate(chatId, { $addToSet: { members: agency._id } }, { new: true });
        if (chat) {
            const populatedChat = yield chat.populate('members', '-password');
            return res.status(200).json(populatedChat);
        }
        return res.status(500).json({ message: "That chat doesn't exist" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.addToChat = addToChat;
const findChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rescue_id1, rescue_id2 } = req.body;
        console.log(rescue_id1);
        console.log(rescue_id2);
        const chat = yield chat_1.default.aggregate([
            {
                $match: {
                    members: {
                        $all: [
                            new mongoose_1.Types.ObjectId(rescue_id1),
                            new mongoose_1.Types.ObjectId(rescue_id2),
                        ],
                    },
                },
            },
        ]);
        return res.status(200).json({ chat });
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.findChat = findChat;
