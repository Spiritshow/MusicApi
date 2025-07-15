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
const DB_1 = require("../ConfConst/DB");
const addsubcategory = (name, id_category, img) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultAddSubcategory = yield DB_1.pool.query(`
            INSERT INTO subcategory(id_category, name, img) VALUES ($1, $2, $3) RETURNING id
        `, [id_category, name, img]);
        const resultUpdateName_db = yield DB_1.pool.query(`
            UPDATE subcategory 
            SET name_db='subcategory_spec_${resultAddSubcategory.rows[0].id}'
            WHERE id=${resultAddSubcategory.rows[0].id}
        `);
        return (resultAddSubcategory.rows[0].id);
    }
    catch (error) {
        console.log("Ошибка при добавлении новой подкатегории:", error);
    }
});
exports.default = addsubcategory;
