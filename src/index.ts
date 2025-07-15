import express  from "express";
import loginRouter from "./Auth/Login";
import cookieParser from "cookie-parser";
import signUp from "./Auth/Signup";
import userInfo from "./UserInfo/UserInfo";
import checkCookie from "./UserInfo/CheckCookie";
import productsCategory from "./Products/Products";
import productInfo from "./Product/Product";
import category from "./Catalog/GetCategors";
import subcategory from "./Catalog/GetSubcategory";
import cors from "cors";
import nameSpecRouter from "./getSpec/getNameSpec";
import valuesSpecRouter from "./getSpec/getValuesSpec";
import isAdminRouter from "./UserInfo/IsAdmin";
import addproductrouter from "./Add/AddProduct";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // или твой frontend
    credentials: true
}))
app.use(loginRouter);
app.use(signUp);
app.use(userInfo);
app.use(checkCookie);
app.use(productsCategory);
app.use(productInfo);
app.use(category);
app.use(subcategory);
app.use(isAdminRouter);
app.use(nameSpecRouter);
app.use(valuesSpecRouter);
// app.use(addcategoryRouter);
// app.use(addsubcategoryRouter);
// app.use(addnamespecRouter);
// app.use(createtablevaluesspec);
// app.use(addvaluespec);
// app.use(addcolumntablespec);

app.use(addproductrouter);


const port = 3000;
app.listen(port, (err?: unknown)=> {
    if(err){
        console.log(err);
    } else {
        console.log(`start port: ${port}`);
    }
})