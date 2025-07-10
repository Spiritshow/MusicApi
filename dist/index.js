"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Login_1 = __importDefault(require("./Auth/Login"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Signup_1 = __importDefault(require("./Auth/Signup"));
const UserInfo_1 = __importDefault(require("./UserInfo/UserInfo"));
const CheckCookie_1 = __importDefault(require("./UserInfo/CheckCookie"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(Login_1.default);
app.use(Signup_1.default);
app.use(UserInfo_1.default);
app.use(CheckCookie_1.default);
const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`start port: ${port}`);
    }
});
