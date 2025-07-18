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
const filter = express_1.default.Router();
filter.post('/Filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subcategory, filterSpec } = req.body;
    try {
        if (filterSpec.length === 0) {
            const resultFilterEmpty = yield DB_1.pool.query(`
                SELECT 
                    p.id,
                    p.name,
                    p.price,
                    (SELECT i.img FROM img i WHERE i.id_product = p.id LIMIT 1) as img,
                    p.subcategory
                FROM product p
                WHERE subcategory=${subcategory}
            `);
            res.json(resultFilterEmpty.rows);
        }
        else {
            var query = `SELECT 
                p.id,
                p.name,
                p.price,
                (SELECT i.img FROM img i WHERE i.id_product = p.id LIMIT 1) as img,
                p.subcategory
            FROM product p
            LEFT JOIN subcategory_spec_${subcategory} ss ON p.id = ss.id_product
            WHERE 
            `;
            const values = [];
            const conditions = [];
            filterSpec.forEach((fs, index) => {
                conditions.push(`ss.${fs.name_db} = $${index + 1}`);
                values.push(fs.value.id);
            });
            query += conditions.join(' AND ');
            const resultFilter = yield DB_1.pool.query(query, values);
            res.json(resultFilter.rows);
        }
    }
    catch (error) {
        console.log("Ошибка при получении отфильтрованных продуктов:", error);
    }
}));
exports.default = filter;
