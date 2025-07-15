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
const addcolumntablespec = (id_subcategory, id_namespec) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultAddColumnTableSpec = yield DB_1.pool.query(`
            ALTER TABLE "subcategory_spec_${id_subcategory}" 
            ADD COLUMN "spec_${id_namespec}" integer REFERENCES "spec_${id_namespec}"(id);
        `);
        return (id_subcategory);
    }
    catch (error) {
        console.log("Ошибка при добавлении новой характеристики в таблицу:", error);
    }
});
exports.default = addcolumntablespec;
