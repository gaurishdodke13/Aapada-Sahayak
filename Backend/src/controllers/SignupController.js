"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendOtp = void 0;
const user_1 = __importDefault(require("../models/user"));
const argon2 = __importStar(require("argon2"));
const jose_1 = require("jose");
const rescue_agency_1 = __importDefault(require("../models/rescue_agency"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// JWT config
const fallbackSigningSecret = 'd7b5dae336250ab03418ca0fdcd0019d695110b500de83df6e1272b1bf9de3b6';
const fallbackEncryptionSecret = '5c7eea01c3dece03ebe9b847259c88865981b30a6e73b9b4f8aeaed01b912491';
const signingSecret = process.env.JWT_SIGNING_SECRET || fallbackSigningSecret;
const encryptionSecret = process.env.JWT_ENCRYPTION_SECRET || fallbackEncryptionSecret;
const signingKey = Buffer.from(signingSecret, 'hex');
const encryptionKey = Buffer.from(encryptionSecret, 'hex');
const jwsAlg = 'HS256';
const jweAlg = 'A256KW';
const jweEnc = 'A256GCM';
const tokenLifetime = '1d';
const otpStore = new Map();
const otpExpirationTime = 3 * 60 * 1000;
const generateOTP = () => {
    // Generate a random six-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
};
function SignupController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, otp, password, name, description, location, address, type, phonesNumbers, } = req.body;
        // change this line when schema changes
        const user = yield user_1.default.findOne({ email: email }).exec();
        if (user !== null) {
            res.json({ error: true, message: 'Agency already registered' });
        }
        else {
            const correctOtp = otpStore.get(email);
            if (!correctOtp) {
                return res
                    .status(401)
                    .json({ error: true, message: ' OTP expired' });
            }
            else if (otp !== correctOtp) {
                return res.status(401).json({ error: true, message: 'Incorrect OTP' });
            }
            else {
                const hash = yield argon2.hash(password);
                const user = yield (yield user_1.default.create({ email, hash, role: 1 })).save();
                const payload = {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                };
                const [lat, long] = location.split(',');
                const agencyDetails = yield (yield rescue_agency_1.default.create(Object.assign({
                    _id: user._id, name: name, location: {
                        type: 'Point',
                        coordinates: [long, lat],
                    }, type: type, address: address, email: email, phone: phonesNumbers
                }, (description ? { description: description } : {})))).save();
                const token = yield new jose_1.SignJWT(payload)
                    .setProtectedHeader({ alg: jwsAlg })
                    .setExpirationTime(tokenLifetime)
                    .sign(signingKey);
                const encryptedToken = yield new jose_1.EncryptJWT({ token })
                    .setProtectedHeader({ alg: jweAlg, enc: jweEnc })
                    .setExpirationTime(tokenLifetime)
                    .encrypt(encryptionKey);
                res.cookie('token', encryptedToken, {
                    httpOnly: true,
                    signed: true,
                    maxAge: 5 * 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
                return res.json({
                    error: false,
                    message: 'Signed up and logged in successfully',
                    user: Object.assign(Object.assign({}, payload), { agencyDetails }),
                });
            }
        }
    });
}
exports.default = SignupController;
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            return res
                .status(401)
                .json({ error: true, message: 'No email received' });
        const otp = generateOTP();
        sendMail(email, 'OTP - ApadaSahayak Registration', `Your OTP for the registration is ${otp}`);
        otpStore.set(email, otp);
        setTimeout(() => {
            otpStore.delete(email);
        }, otpExpirationTime);
        return res.status(200).json({ error: false, message: 'OTP sent', otp });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Server error' });
    }
});
exports.sendOtp = sendOtp;
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'aapadasahayak.comp@gmail.com',
        pass: 'ytzm tdda hwzh mwlo',
    },
});
function sendMail(to, subject, text) {
    try {
        const mailOptions = {
            from: 'aapadasahayak.comp@gmail.com',
            to: to,
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}
