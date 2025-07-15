"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SecretKey_1 = __importDefault(require("../ConfConst/SecretKey"));
const isAdminRouter = express_1.default.Router();
isAdminRouter.get('/isAdmin', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Нет токена" });
        return;
    }
    jsonwebtoken_1.default.verify(token, SecretKey_1.default, (err, user) => {
        if (err || !user) {
            res.status(403).json({ message: "Недействительный токен" });
            return;
        }
        if (typeof user === "object" && "id" in user && "username" in user) {
            if (user.username === "vkozyaychev@mail.ru") {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
        else {
            res.status(403).json({ message: "Недействительный токен" });
        }
    });
});
exports.default = isAdminRouter;
