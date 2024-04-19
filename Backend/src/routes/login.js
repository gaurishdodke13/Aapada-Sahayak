"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const router = (0, express_1.Router)();
router.post('/', (0, express_validator_1.body)('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(), (0, express_validator_1.body)('password')
    .trim()
    .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
})
    .withMessage('Invalid password'), (req, res, next) => {
    if (!req.body) {
        res.json({ error: true, message: 'No data sent' });
    }
    else if (!req.body.role) {
        res.json({ error: true, message: 'No role field sent' });
    }
    else if (req.body.role !== '0' && req.body.role !== '1') {
        res.json({
            error: true,
            message: 'Invalid role. Please send 0 to login as government body, or 1 to login as a rescue agency',
        });
    }
    else {
        const err = (0, express_validator_1.validationResult)(req);
        if (!err.isEmpty()) {
            res.json({
                error: true,
                message: err
                    .array()
                    .map((val) => val.msg)
                    .join(', '),
            });
        }
        else {
            next();
        }
    }
}, LoginController_1.default);
exports.default = router;
