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
const helpers_1 = require("../UserInfo/helpers");
const isproductinbasket = express_1.default.Router();
isproductinbasket.get('/isproductinbasket/:id_product', helpers_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id_product = req.params.id_product;
    const id_user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const Result = yield DB_1.pool.query(`SELECT * FROM basket WHERE id_product=${id_product} AND id_user=${id_user}`);
        if (Result.rows.length > 0) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    }
    catch (error) {
        console.log("Ошибка при проверке продукта в корзине:", error);
        res.json(false);
    }
}));
exports.default = isproductinbasket;
