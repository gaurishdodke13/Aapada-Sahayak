"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("./signup"));
const login_1 = __importDefault(require("./login"));
const checkauth_1 = __importDefault(require("./checkauth"));
const logout_1 = __importDefault(require("./logout"));
const getagencies_1 = __importDefault(require("./getagencies"));
const changerequeststatus_1 = __importDefault(require("./changerequeststatus"));
const getsentrequests_1 = __importDefault(require("./getsentrequests"));
const getreceivedrequests_1 = __importDefault(require("./getreceivedrequests"));
const getresources_1 = __importDefault(require("./getresources"));
const updateresources_1 = __importDefault(require("./updateresources"));
const chat_1 = __importDefault(require("./chat"));
const sos_1 = __importDefault(require("./sos"));
const getsos_1 = __importDefault(require("./getsos"));
// import isAuthenticated from '../utils/isAuthenticated';
// import isRescueAgency from '../utils/isRescueAgency';
// importing all models
const router = (0, express_1.Router)();
router.use('/signup', signup_1.default);
router.use('/login', login_1.default);
router.use('/checkauth', checkauth_1.default);
router.use('/logout', logout_1.default);
router.use('/getagencies', getagencies_1.default); // get all agencies and their inventory details to display it on the map
router.use('/changerequeststatus', changerequeststatus_1.default); // update request status
router.use('/getsentrequests', getsentrequests_1.default); // all requests issued by a user
router.use('/getreceivedrequests', getreceivedrequests_1.default); // all requests issued by an agency
router.use('/getresources', getresources_1.default); // to display inventory to a rescue agency
router.use('/updateresources', updateresources_1.default); // to let rescue agencies update their inventory details
router.use('/getsos', getsos_1.default); // to let rescue agencies update their inventory details
router.use('/sos', sos_1.default); // to let rescue agencies update their inventory details
router.use('/chat', chat_1.default);
// error route
router.all('*', (req, res) => {
    // res.send(req.user);
    res.status(404).json({ error: true, message: "Endpoint doesn't exist" });
});
exports.default = router;
