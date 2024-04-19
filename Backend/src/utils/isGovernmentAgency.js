"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated_1 = __importDefault(require("./isAuthenticated"));
function isGovernmentAgency(req, res, next) {
    if (req.user === undefined) {
        (0, isAuthenticated_1.default)(req, res, next);
    }
    else if (req.user.role == 0) {
        next();
    }
    else {
        res.status(403).json({ error: true, message: 'Not authorized' });
    }
}
exports.default = isGovernmentAgency;
