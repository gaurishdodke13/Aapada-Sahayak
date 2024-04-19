"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const SignupController_1 = __importStar(require("../controllers/SignupController"));
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
    .withMessage('Password not strong enough: must be atleast 8 characters long and must contain atleast one lowercase, uppercase and special character'), (0, express_validator_1.body)('name')
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name required'), (0, express_validator_1.body)('description').optional().trim().escape(), (0, express_validator_1.body)('location')
    .escape()
    .trim()
    .isLatLong()
    .withMessage('Location required')
    .escape(), (0, express_validator_1.body)('address')
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Address required'), (0, express_validator_1.body)('type').escape().isLength({ min: 1 }).withMessage('Type required'), (req, res, next) => {
    const err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        // console.log(err.array());
        res.json({
            error: true,
            message: err
                .array()
                .map((val) => val.msg)
                .join(', '),
        });
    }
    else {
        const { phonesNumbers } = req.body;
        // console.log(req)
        if (!Array.isArray(phonesNumbers)) {
            res.json({ error: true, message: 'No phone number provided' });
        }
        else {
            let error = false;
            for (let i = 0; i < phonesNumbers.length; i++) {
                if (typeof phonesNumbers[i] !== 'string' ||
                    phonesNumbers[i].length !== 10) {
                    error = true;
                    res.json({ error: true, message: 'Invalid phone number' });
                    break;
                }
            }
            if (!error) {
                next();
            }
        }
    }
}, SignupController_1.default);
router.post('/otp', SignupController_1.sendOtp);
exports.default = router;
