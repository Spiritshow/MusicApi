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
const helpers_1 = __importDefault(require("./helpers"));
const DB_1 = require("../ConfConst/DB");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = express_1.default.Router();
login.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield DB_1.pool.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            res.status(401).json({ message: "Неверный логин или пароль" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Неверный логин или пароль" });
        }
        const token = (0, helpers_1.default)(user);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ message: "Успешный вход" });
    }
    catch (error) {
        console.error("Ошибка при входе:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}));
login.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Выход выполнен" });
});
exports.default = login;
