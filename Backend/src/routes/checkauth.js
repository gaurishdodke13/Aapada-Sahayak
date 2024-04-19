"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthenticated_1 = __importDefault(require("../utils/isAuthenticated"));
const router = (0, express_1.Router)();
router.get('/', isAuthenticated_1.default, (_req, res) => {
    res.json({ error: false, message: 'is authenticated' });
});
exports.default = router;
