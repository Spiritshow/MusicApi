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
const updatecountprodact = express_1.default.Router();
updatecountprodact.patch('/updatecountprodact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const value = req.body.value;
    const id_position = req.body.id_position;
    try {
        const QueryMaxCount = yield DB_1.pool.query(`
            SELECT
	            p.count AS maxcount
            FROM
                basket b
            LEFT JOIN product p ON b.id_product = p.id
            WHERE b.id=$1;`, [id_position]);
        const newCount = QueryMaxCount.rows[0].maxcount > value ? value : QueryMaxCount.rows[0].maxcount;
        const QueryUpdateCount = yield DB_1.pool.query(`
            UPDATE basket
            SET count=$1
            WHERE id=$2 RETURNING count;`, [newCount, id_position]);
        res.json(QueryUpdateCount.rows[0].count);
    }
    catch (error) {
        console.log("Ошибка при изменении количевтва продукта в корзине:" + error);
        res.status(500).json({ massege: "Ошибка при изменении количевтва продукта в корзине" });
    }
}));
exports.default = updatecountprodact;
