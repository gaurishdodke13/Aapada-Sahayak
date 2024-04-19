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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const index_1 = __importDefault(require("./src/routes/index"));
const admin_ui_1 = require("@socket.io/admin-ui");
const RequestController_1 = require("./src/controllers/RequestController");
const { default: mongoose } = require("mongoose");
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = __importDefault(require("./src/models/user"));
dotenv_1.default.config();
// function connect() {
//     return __awaiter(this, void 0, void 0, function* () {
//         if (process.env.MONGODB_CONNECTION_STRING) {
//             yield mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
//             console.log('Successfully connected to database');
//         }
//         else {
//             console.error('Connection string not specified. Please specify connection string in an environment variable MONGODB_CONNECTION_STRING in .env file in root folder');
//         }
//     });
// }
// connect();
mongoose.connect('mongodb://127.0.0.1:27017/trial', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));
const app = (0, express_1.default)();
const fallbackCookieSigningSecret = '4f5b8f67d973a914c695b47800fb22b887eda1a290829110e3aebc6383d65c6b';
// middlewares
app.use((0, cors_1.default)({
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SIGNING_SECRET || fallbackCookieSigningSecret));
app.use(index_1.default);
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            'http://localhost:3001',
            'http://localhost:5173',
            'https://admin.socket.io',
        ],
        credentials: true,
    },
});
nodemailer_1.default;
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
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join-room', (room) => {
        console.log(console.log('joined room' + room));
        socket.join(room);
    });
    socket.on('send-request', (room, req_data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const request_data = yield (0, RequestController_1.addRequest)(req_data);
        socket.to(room).emit('receive-request', request_data);
        // console.log(request_data);
        let itemString = '';
        for (let i = 0; i < request_data.requested_items.length; i++) {
            itemString += `${i + 1}. Type: ${request_data.requested_items[i].type}\nName: ${request_data.requested_items[i].name}\nQuantity: ${request_data.requested_items[i].qty}\nUnit: ${request_data.requested_items[i].unit}\n`;
        }
        const email = (_a = (yield user_1.default.findOne({ _id: req_data.requestee_id }))) === null || _a === void 0 ? void 0 : _a.email.trim();
        if (email) {
            sendMail(
                // email,
                'bhushansjadhav007@gmail.com',
                //@ts-ignore
                `Request from ${request_data.rescue_requester_id.name}`,
                //@ts-ignore
                `Rescue agency ${request_data.rescue_requester_id.name} has sent a request:\n\n\nRequested resources:\n${itemString}`);
        }
    }));
    socket.on('respond-to-request', (room, reqId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, RequestController_1.updateRequest)(reqId, newStatus);
        socket.to(room).emit('responded-to-request', reqId, newStatus);
    }));
    socket.on('new-message', (room, message) => {
        socket.to(room).emit('receive-message', message, room);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('typing', (username, chatId) => {
        socket.to(chatId).emit('is-typing', username, chatId);
    });
    socket.on('stop-typing', (username, chatId) => {
        socket.to(chatId).emit('isnt-typing', username, chatId);
    });
    socket.on('update-location', (userId, newLocation) => {
        io.emit('receive-locations', userId, newLocation);
    });
});
(0, admin_ui_1.instrument)(io, {
    auth: false,
    mode: 'development',
});
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
