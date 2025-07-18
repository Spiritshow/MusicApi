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
const getpositionsinbasket = express_1.default.Router();
getpositionsinbasket.get(`/getpositionsinbasket`, helpers_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id_user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const QueryGetPositions = yield DB_1.pool.query(`
            SELECT 
                b.id,
                b.id_product,
                p.name AS name_product,
                (SELECT i.img FROM img i WHERE p.id = i.id_product LIMIT 1) as img,
                b.count
            FROM
                basket b
            LEFT JOIN product p ON b.id_product=p.id
            WHERE b.id_user=$1
            GROUP BY
                b.id,p.name,p.id;
            `, [id_user]);
        res.json(QueryGetPositions.rows);
    }
    catch (error) {
        console.log("Ошибка при получении позиций корзины" + error);
        res.status(400);
    }
}));
exports.default = getpositionsinbasket;
