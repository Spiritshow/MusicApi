"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("./helpers");
const checkCookie = express_1.default.Router();
checkCookie.get("/api/checkCookie", helpers_1.authenticateToken, (req, res) => {
    res.status(200).json({ auth: true });
});
