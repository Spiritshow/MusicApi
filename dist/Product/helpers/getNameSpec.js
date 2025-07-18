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
const getNameSpec = (name_db) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nameSpec = yield DB_1.pool.query(`SELECT name FROM ConfSpec WHERE name_db = $1`, [name_db]);
        return (nameSpec.rows[0].name);
    }
    catch (error) {
        console.log("Ошибка при выдаче характеристик:", error);
    }
});
exports.default = getNameSpec;
