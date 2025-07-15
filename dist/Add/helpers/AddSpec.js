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
const addspec = (id_subcategory, id_product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_subcategoryspec = yield DB_1.pool.query(`
            INSERT INTO "subcategory_spec_${id_subcategory}"(id_product) 
            VALUES (${id_product}) RETURNING id;
        `);
        return id_subcategoryspec.rows[0].id;
    }
    catch (error) {
        console.log("Ошибка при добавлении новых характеристик продукта:", error);
    }
});
exports.default = addspec;
