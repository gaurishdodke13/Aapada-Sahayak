"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('apadarelief');
    res.json({ error: false, message: 'Logged out sucessfully' });
});
exports.default = router;
