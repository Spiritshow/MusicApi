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
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = express_1.default.Router();
signUp.post('/SignUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { FIO, nickname, numberPhone, address, email, birthday, password } = req.body;
    if (!FIO || !address || !email || !password) {
        res.status(400).json({ message: "Заполните обязательные поля: FIO, address, email, password" });
        return;
    }
    try {
        const existingUser = yield DB_1.pool.query("SELECT * FROM users WHERE username = $1", [email]);
        if (existingUser.rows.length > 0) {
            res.status(409).json({ message: "Пользователь с таким email уже существует" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const userInsertResult = yield DB_1.pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id", [email, hashedPassword]);
        const userId = userInsertResult.rows[0].id;
        yield DB_1.pool.query(`INSERT INTO user_info 
        (id_user, FIO, nickname, numberPhone, address, email, birthday)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`, [userId, FIO, nickname || null, numberPhone || null, address, email, birthday || null]);
        res.status(201).json({ message: "Регистрация прошла успешно" });
    }
    catch (error) {
        console.error("Ошибка при регистрации:", error);
        res.status(500).json({ message: "Ошибка сервера при регистрации" });
    }
}));
exports.default = signUp;
