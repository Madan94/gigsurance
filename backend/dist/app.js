"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//backend configs
const database_js_1 = require("./config/database.js");
const driverAuth_routes_js_1 = __importDefault(require("./routes/driverAuth.routes.js"));
dotenv_1.default.config();
(0, database_js_1.connectToDatabase)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log('Headers:', {
        authorization: req.headers.authorization ? 'Present' : 'Missing',
        'content-type': req.headers['content-type']
    });
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});
app.get("/", (req, res) => {
    res.send("GigSurance - Ensure your insurance");
});
app.use("/api", driverAuth_routes_js_1.default);
exports.default = app;
