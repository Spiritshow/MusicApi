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
const getNameSubcategory = express_1.default.Router();
getNameSubcategory.get('/getNameSubcategory/:id_subcategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_subcategory = req.params.id_subcategory;
    try {
        const Result = yield DB_1.pool.query('SELECT name FROM subcategory WHERE id=$1', [id_subcategory]);
        res.json(Result.rows[0].name);
    }
    catch (error) {
        console.log("Ошибка при выдаче значений характеристик:", error);
    }
}));
exports.default = getNameSubcategory;
