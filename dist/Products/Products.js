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
const productsCategory = express_1.default.Router();
productsCategory.get("/products/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    try {
        const products = yield DB_1.pool.query(`
            SELECT DISTINCT ON (p.id)
                p.id,
                p.name,
                p.price,
                p.subcategory,
                i.img
            FROM 
                product p
            LEFT JOIN 
                img i ON p.id = i.id_product
            WHERE 
                p.subcategory = $1
            ORDER BY 
                p.id, i.id;`, [category]);
        res.json(products.rows);
    }
    catch (error) {
        console.log("Ошибка при выдаче продуктов:", error);
        res.status(500).json({ message: "Ошибка сервера при при выдаче продуктов" });
    }
}));
exports.default = productsCategory;
