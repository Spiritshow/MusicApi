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
const deleteposition = express_1.default.Router();
deleteposition.delete(`/deleteposition/:id_position`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_position = req.params.id_position;
    try {
        const QueryDeletePosition = DB_1.pool.query(`
            DELETE FROM basket 
            WHERE id = $1;`, [id_position]);
        res.json('OK');
    }
    catch (error) {
        console.log("Ошибка при удалении позиции корзины");
        res.status(400);
    }
}));
exports.default = deleteposition;
