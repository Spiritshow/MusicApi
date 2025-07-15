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
const addnamespec = (name, subcategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultAddNameSpec = yield DB_1.pool.query(`
            INSERT INTO ConfSpec(name, subcategory) VALUES ($1, $2) RETURNING id
        `, [name, subcategory]);
        const resultUpdateName_db = yield DB_1.pool.query(`
            UPDATE ConfSpec
            SET name_db = 'spec_${resultAddNameSpec.rows[0].id}'
            WHERE id = ${resultAddNameSpec.rows[0].id}
        `);
        return (resultAddNameSpec.rows[0].id);
    }
    catch (error) {
        console.log("Ошибка при добавлении нового названия характеристики:", error);
    }
});
exports.default = addnamespec;
