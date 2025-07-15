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
const translatorSpec = (rawSpec) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resolved = {};
    for (const [field, value] of Object.entries(rawSpec)) {
        if (field === 'id_product' || field === 'id') {
            resolved[field] = value;
            continue;
        }
        try {
            const req = yield DB_1.pool.query(`
        SELECT name FROM ${field} WHERE id = $1;
      `, [value]);
            resolved[field] = ((_a = req.rows[0]) === null || _a === void 0 ? void 0 : _a.name) || null;
        }
        catch (error) {
            console.log(`Не удалось разрешить поле ${field}:`, error);
            resolved[field] = value;
        }
    }
    return resolved;
});
exports.default = translatorSpec;
