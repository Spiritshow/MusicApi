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
const DB_1 = require("../ConfConst/DB");
const helpers_1 = require("./helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const updatepassword = express_1.default.Router();
updatepassword.post('/changepassword', helpers_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const value = req.body.password;
    const user = req.user;
    if (typeof value === "undefined") {
        res.json({ massege: "Введите пароль" });
        return;
    }
    const password = yield bcrypt_1.default.hash(value, 10);
    if (typeof user === "undefined") {
        res.json({ massege: "Ошибка при изменении даннх о пользователе" });
        return;
    }
    try {
        yield DB_1.pool.query(`
            UPDATE users
            SET password='$1'
            WHERE id=${user.id};`, [password]);
        res.json({ massege: "Изменено!" });
    }
    catch (error) {
        console.log("Ошибка при изменении даннх о пользователе:", error);
    }
}));
exports.default = updatepassword;
