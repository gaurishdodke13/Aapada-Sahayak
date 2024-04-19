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
const express_1 = require("express");
const isAuthenticated_1 = __importDefault(require("../utils/isAuthenticated"));
const resource_1 = __importDefault(require("../models/resource"));
const isRescueAgency_1 = __importDefault(require("../utils/isRescueAgency"));
const router = (0, express_1.Router)();
// get all agencies within a particular radius (in kilometers)
router.post('/', isAuthenticated_1.default, isRescueAgency_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const { _id, type, name, quantity, unit, del } = req.body;
    if (del && _id) {
        yield resource_1.default.findByIdAndRemove(_id);
    }
    else if (!_id) {
        yield (yield resource_1.default.create({
            agency_id: req.user.id,
            name: name,
            quantity: quantity,
            type: type,
            unit: unit,
        })).save();
    }
    else {
        const x = yield resource_1.default.findById(_id);
        if (!x) {
            yield (yield resource_1.default.create({
                agency_id: req.user.id,
                name: name,
                quantity: quantity,
                type: type,
                unit: unit,
            })).save();
        }
        else {
            x.type = type;
            x.name = name;
            x.quantity = quantity;
            x.unit = unit;
            yield x.save();
        }
    }
    res.json({ error: false, message: 'Resources updated' });
}));
exports.default = router;
