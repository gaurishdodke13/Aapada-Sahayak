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
const user_1 = __importDefault(require("../models/user"));
const argon2 = __importStar(require("argon2"));
const jose_1 = require("jose");
const rescue_agency_1 = __importDefault(require("../models/rescue_agency"));
const govt_agency_1 = __importDefault(require("../models/govt_agency"));
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
function LoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, } = req.body;
        const role = Number(req.body.role);
        console.log(role);
        // change this line when schema changes
        const user = yield user_1.default.findOne({ email: email }).exec();
        if (user === null) {
            res.json({ error: true, message: "User doesn't exist" });
        }
        else {
            const verified = yield argon2.verify(user.hash, password);
            if (verified) {
                if (user.role === role) {
                    // sign and encrpyt a JWT and send it to the client
                    let agencyDetails;
                    if (role === 1) {
                        agencyDetails = yield rescue_agency_1.default.findById(user._id);
                    }
                    else {
                        agencyDetails = yield govt_agency_1.default.findById(user._id);
                    }
                    const payload = {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                    };
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
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'none',
                        secure: true,
                    });
                    res.json({
                        error: false,
                        message: 'Logged in successfully',
                        user: Object.assign(Object.assign({}, payload), { agencyDetails }),
                    });
                }
                else {
                    res.status(403).json({ error: false, message: 'Not authorized' });
                }
            }
            else {
                res.json({ error: true, message: 'Invalid password' });
            }
        }
    });
}
exports.default = LoginController;
