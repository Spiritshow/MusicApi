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
const getValuesSpec = (name, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valuesSpec = yield DB_1.pool.query(`SELECT name FROM ${name} WHERE id=$1`, [value]);
        if (valuesSpec.rows.length > 0) {
            return (valuesSpec.rows[0].name);
        }
        else {
            return ("Нет значения");
        }
    }
    catch (error) {
        console.log("Ошибка при выдаче значений характеристик:", error);
    }
});
exports.default = getValuesSpec;
