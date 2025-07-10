"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SecretKey_1 = __importDefault(require("../ConfConst/SecretKey"));
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, SecretKey_1.default, {
        expiresIn: "7d",
    });
}
exports.default = generateToken;
