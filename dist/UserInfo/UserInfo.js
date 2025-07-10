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
const helpers_1 = require("./helpers");
const DB_1 = require("../ConfConst/DB");
const userInfo = express_1.default.Router();
userInfo.get("/userInfo", helpers_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const result = yield DB_1.pool.query(`SELECT id, FIO, nickname, numberPhone, address, email, birthday
            FROM user_info
            WHERE id_user = $1`, [user === null || user === void 0 ? void 0 : user.id]);
        const userInfo = result.rows[0];
        if (!userInfo) {
            res.status(404);
            return;
        }
        res.json(userInfo);
    }
    catch (error) {
        console.log("userInfo: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}));
exports.default = userInfo;
