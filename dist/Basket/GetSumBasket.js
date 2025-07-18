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
const helpers_1 = require("../UserInfo/helpers");
const DB_1 = require("../ConfConst/DB");
const getsumbasket = express_1.default.Router();
getsumbasket.get('/getsumbasket', helpers_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id_user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const Result = yield DB_1.pool.query(`
            SELECT 
                COUNT(b.id) AS countProducts,
                SUM(p.price * b.count) AS sum
            FROM basket b
            JOIN product p ON b.id_product = p.id
            WHERE b.id_user = $1;`, [id_user]);
        res.json(Result.rows[0]);
    }
    catch (error) {
        console.log("Ошибка при попытке достать сумму корзины" + error);
        res.json({ sum: 0, countProducts: 0 });
    }
}));
exports.default = getsumbasket;
