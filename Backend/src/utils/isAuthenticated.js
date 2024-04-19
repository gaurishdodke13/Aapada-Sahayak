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
Object.defineProperty(exports, "__esModule", { value: true });
const jose_1 = require("jose");
// import { AuthenticatedReq } from '../types/schema';
const fallbackSigningSecret = 'd7b5dae336250ab03418ca0fdcd0019d695110b500de83df6e1272b1bf9de3b6';
const fallbackEncryptionSecret = '5c7eea01c3dece03ebe9b847259c88865981b30a6e73b9b4f8aeaed01b912491';
const signingSecret = process.env.JWT_SIGNING_SECRET || fallbackSigningSecret;
const encryptionSecret = process.env.JWT_ENCRYPTION_SECRET || fallbackEncryptionSecret;
const signingKey = Buffer.from(signingSecret, 'hex');
const encryptionKey = Buffer.from(encryptionSecret, 'hex');
const jwsAlg = 'HS256';
const jweAlg = 'A256KW';
const jweEnc = 'A256GCM';
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.signedCookies || !req.signedCookies.token) {
            res.status(401).json({ error: true, message: 'Not authenticated' });
        }
        else {
            const signedToken = yield (0, jose_1.jwtDecrypt)(req.signedCookies.token, encryptionKey, {
                keyManagementAlgorithms: [jweAlg],
                contentEncryptionAlgorithms: [jweEnc],
            });
            try {
                if (!signedToken.payload.token) {
                    throw new Error();
                }
                console.log(signedToken.payload.token);
                const { payload } = yield (0, jose_1.jwtVerify)(
                // @ts-ignore
                signedToken.payload.token, signingKey, {
                    algorithms: [jwsAlg],
                });
                req.user = {
                    // @ts-ignore
                    id: payload.id,
                    // @ts-ignore
                    email: payload.email,
                    // @ts-ignore
                    role: payload.role,
                };
                next();
            }
            catch (err) {
                res.status(401).json({ error: true, message: 'Not authenticated' });
            }
        }
    });
}
exports.default = isAuthenticated;
