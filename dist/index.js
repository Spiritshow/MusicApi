"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Login_1 = __importDefault(require("./Auth/Login"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Signup_1 = __importDefault(require("./Auth/Signup"));
const UserInfo_1 = __importDefault(require("./UserInfo/UserInfo"));
const CheckCookie_1 = __importDefault(require("./UserInfo/CheckCookie"));
const Products_1 = __importDefault(require("./Products/Products"));
const Product_1 = __importDefault(require("./Product/Product"));
const GetCategors_1 = __importDefault(require("./Catalog/GetCategors"));
const GetSubcategory_1 = __importDefault(require("./Catalog/GetSubcategory"));
const cors_1 = __importDefault(require("cors"));
const getNameSpec_1 = __importDefault(require("./getSpec/getNameSpec"));
const getValuesSpec_1 = __importDefault(require("./getSpec/getValuesSpec"));
const IsAdmin_1 = __importDefault(require("./UserInfo/IsAdmin"));
const AddProduct_1 = __importDefault(require("./Add/AddProduct"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // или твой frontend
    credentials: true
}));
app.use(Login_1.default);
app.use(Signup_1.default);
app.use(UserInfo_1.default);
app.use(CheckCookie_1.default);
app.use(Products_1.default);
app.use(Product_1.default);
app.use(GetCategors_1.default);
app.use(GetSubcategory_1.default);
app.use(IsAdmin_1.default);
app.use(getNameSpec_1.default);
app.use(getValuesSpec_1.default);
// app.use(addcategoryRouter);
// app.use(addsubcategoryRouter);
// app.use(addnamespecRouter);
// app.use(createtablevaluesspec);
// app.use(addvaluespec);
// app.use(addcolumntablespec);
app.use(AddProduct_1.default);
const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`start port: ${port}`);
    }
});
