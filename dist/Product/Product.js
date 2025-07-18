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
const InfoProduct_1 = __importDefault(require("./helpers/InfoProduct"));
const InfoSpec_1 = __importDefault(require("./helpers/InfoSpec"));
const getNameSpec_1 = __importDefault(require("./helpers/getNameSpec"));
const getValueSpec_1 = __importDefault(require("./helpers/getValueSpec"));
const productInfo = express_1.default.Router();
productInfo.get("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield (0, InfoProduct_1.default)(id);
        if (!product)
            throw new Error('not found');
        const rawSpec = yield (0, InfoSpec_1.default)(product.subcategorytable, id);
        const rawSpecifications = yield Object.entries(rawSpec)
            .filter(([key]) => key.startsWith("spec_"))
            .map(([key, value]) => ({
            name: key,
            value: value
        }));
        const specifications = yield Promise.all(rawSpecifications.map((raw) => __awaiter(void 0, void 0, void 0, function* () {
            const name = yield (0, getNameSpec_1.default)(raw.name);
            const value = yield (0, getValueSpec_1.default)(raw.name, raw.value);
            return ({ name, value });
        })));
        res.json(Object.assign(Object.assign({}, product), { specifications: specifications }));
    }
    catch (error) {
        console.log("Ошибка при выдаче информации по продукту:", error);
        res.status(500).json({ message: "Ошибка сервера при при выдаче информации по продукту:" });
    }
}));
exports.default = productInfo;
