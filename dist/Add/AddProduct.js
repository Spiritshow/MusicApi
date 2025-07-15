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
const multer_1 = __importDefault(require("multer"));
const SafeImage_1 = __importDefault(require("./helpers/SafeImage"));
const types_1 = require("util/types");
const AddCategory_1 = __importDefault(require("./AddCategory"));
const AddSubcategory_1 = __importDefault(require("./AddSubcategory"));
const CreateTableSpec_1 = __importDefault(require("./CreateTableSpec"));
const AddNameSpec_1 = __importDefault(require("./AddNameSpec"));
const CreateTableValuesSpec_1 = __importDefault(require("./CreateTableValuesSpec"));
const AddValuesSpec_1 = __importDefault(require("./AddValuesSpec"));
const AddColumnTableSpec_1 = __importDefault(require("./AddColumnTableSpec"));
const AddInfoProduct_1 = __importDefault(require("./helpers/AddInfoProduct"));
const AddImgProduct_1 = __importDefault(require("./helpers/AddImgProduct"));
const AddSpec_1 = __importDefault(require("./helpers/AddSpec"));
const UpdateSpec_1 = __importDefault(require("./helpers/UpdateSpec"));
const addproductrouter = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: SafeImage_1.default });
addproductrouter.post("/addproduct", upload.array("images", 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, count, category, newcategory, subcategory, newsubcategory } = req.body;
    const req_specs = JSON.parse(req.body.specs || "{}");
    const newSpecs = JSON.parse(req.body.newSpecs || "[]");
    const images = req.files;
    const req_id_category = Number(category);
    const req_id_subcategory = Number(subcategory);
    const nameImages = images.map(img => img.filename);
    const specs = Object.entries(req_specs).map(([key, val]) => ({
        name: key,
        value: val
    }));
    const specifications = [];
    console.log("Новый продукт:", {
        name,
        price,
        description,
        count,
        category,
        newcategory,
        subcategory,
        newsubcategory,
        specs,
        newSpecs,
        images: images.map(img => img.filename),
    });
    if (req_id_category === 0) {
        const id_category = yield (0, AddCategory_1.default)(newcategory);
        if (typeof id_category === "undefined") {
            res.status(500).json({ message: "Ошибка сервера при добавлении новой категории" });
            return;
        }
        const id_subcategory = yield (0, AddSubcategory_1.default)(newsubcategory, id_category, nameImages);
        if (typeof id_subcategory === "undefined") {
            res.status(500).json({ message: "Ошибка сервера при добавлении новой подкатегории" });
            return;
        }
        const id_product = yield (0, AddInfoProduct_1.default)(name, price, description, count, id_subcategory);
        if (typeof id_product === "undefined") {
            res.status(500).json({ message: "Ошибка сервера при добавлении нового продукта" });
            return;
        }
        for (const img of nameImages) {
            yield (0, AddImgProduct_1.default)(id_product, img);
        }
        yield (0, CreateTableSpec_1.default)(id_subcategory);
        for (const newSpec of newSpecs) {
            const id_namespec = yield (0, AddNameSpec_1.default)(newSpec.name, id_subcategory);
            if (typeof id_namespec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении новой характеристики" });
                return;
            }
            yield (0, CreateTableValuesSpec_1.default)(id_namespec);
            yield (0, AddColumnTableSpec_1.default)(id_subcategory, id_namespec);
            const id_valuespec = yield (0, AddValuesSpec_1.default)(`spec_${id_namespec}`, newSpec.value);
            if (typeof id_valuespec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                return;
            }
            specifications.push({ name: `spec_${id_namespec}`, value: id_valuespec });
        }
        const id_subcategoryspec = yield (0, AddSpec_1.default)(id_subcategory, id_product);
        if (typeof id_subcategoryspec === "undefined") {
            res.status(500).json({ message: "Ошибка сервера при добавлении новых характеристик продукта" });
            return;
        }
        for (const specification of specifications) {
            yield (0, UpdateSpec_1.default)(id_subcategory, specification, id_subcategoryspec);
        }
    }
    else {
        if (req_id_subcategory === 0) {
            const id_category = req_id_category;
            const id_subcategory = yield (0, AddSubcategory_1.default)(newsubcategory, id_category, nameImages);
            if (typeof id_subcategory === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении новой подкатегории" });
                return;
            }
            const id_product = yield (0, AddInfoProduct_1.default)(name, price, description, count, id_subcategory);
            if (typeof id_product === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении нового продукта" });
                return;
            }
            for (const img of nameImages) {
                yield (0, AddImgProduct_1.default)(id_product, img);
            }
            yield (0, CreateTableSpec_1.default)(id_subcategory);
            for (const newSpec of newSpecs) {
                const id_namespec = yield (0, AddNameSpec_1.default)(newSpec.name, id_subcategory);
                if (typeof id_namespec === "undefined") {
                    res.status(500).json({ message: "Ошибка сервера при добавлении новой характеристики" });
                    return;
                }
                yield (0, CreateTableValuesSpec_1.default)(id_namespec);
                yield (0, AddColumnTableSpec_1.default)(id_subcategory, id_namespec);
                const id_valuespec = yield (0, AddValuesSpec_1.default)(`spec_${id_namespec}`, newSpec.value);
                if (typeof id_valuespec === "undefined") {
                    res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                    return;
                }
                specifications.push({ name: `spec_${id_namespec}`, value: id_valuespec });
            }
            const id_subcategoryspec = yield (0, AddSpec_1.default)(id_subcategory, id_product);
            if (typeof id_subcategoryspec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении новых характеристик продукта" });
                return;
            }
            for (const specification of specifications) {
                yield (0, UpdateSpec_1.default)(id_subcategory, specification, id_subcategoryspec);
            }
        }
        else {
            const id_category = req_id_category;
            const id_subcategory = req_id_subcategory;
            const id_product = yield (0, AddInfoProduct_1.default)(name, price, description, count, id_subcategory);
            if (typeof id_product === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении нового продукта" });
                return;
            }
            for (const img of nameImages) {
                yield (0, AddImgProduct_1.default)(id_product, img);
            }
            if (newSpecs.length > 0) {
                for (const newSpec of newSpecs) {
                    const id_namespec = yield (0, AddNameSpec_1.default)(newSpec.name, id_subcategory);
                    if (typeof id_namespec === "undefined") {
                        res.status(500).json({ message: "Ошибка сервера при добавлении новой характеристики" });
                        return;
                    }
                    yield (0, CreateTableValuesSpec_1.default)(id_namespec);
                    yield (0, AddColumnTableSpec_1.default)(id_subcategory, id_namespec);
                    const id_valuespec = yield (0, AddValuesSpec_1.default)(`spec_${id_namespec}`, newSpec.value);
                    if (typeof id_valuespec === "undefined") {
                        res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                        return;
                    }
                    specifications.push({ name: `spec_${id_namespec}`, value: id_valuespec });
                }
            }
            for (const spec of specs) {
                if ((0, types_1.isNumberObject)(spec.value)) {
                    specifications.push({ name: spec.name, value: spec.value });
                }
                else {
                    const id_valuespec = yield (0, AddValuesSpec_1.default)(spec.name, spec.value);
                    if (typeof id_valuespec === "undefined") {
                        res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                        return;
                    }
                    specifications.push({ name: spec.name, value: id_valuespec });
                }
            }
            const id_subcategoryspec = yield (0, AddSpec_1.default)(id_subcategory, id_product);
            if (typeof id_subcategoryspec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении новых характеристик продукта" });
                return;
            }
            for (const specification of specifications) {
                yield (0, UpdateSpec_1.default)(id_subcategory, specification, id_subcategoryspec);
            }
        }
    }
    res.json({ message: "Продукт успешно добавлен" });
}));
exports.default = addproductrouter;
