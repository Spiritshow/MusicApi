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
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../ConfConst/DB");
const infoProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield DB_1.pool.query(`
        SELECT 
            p.id,
            p.name,
            p.price,
            array_agg(i.img) AS img,
            p.description,
            p.count,
            s.name AS subcategoryname,
            s.name_db AS subcategorytable
        FROM 
            product p
        LEFT JOIN subcategory s ON p.subcategory = s.id
        LEFT JOIN img i ON p.id = i.id_product
        WHERE p.id = $1
        GROUP BY 
            p.id, s.name, s.name_db;
    `, [productId]);
    return req.rows[0];
});
exports.default = infoProduct;
