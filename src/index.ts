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
import updateuserinfo from "./UserInfo/UpdateUserInfo";
import updatepassword from "./UserInfo/UpdatePassword";
import filter from "./Products/Filter";
import path from "path";
import getNameSubcategory from "./Products/getNameSubcategory";
import isproductinbasket from "./Basket/IsProductInBasket";
import addinbasket from "./Basket/AddInBasket";
import getsumbasket from "./Basket/GetSumBasket";
import updatecountprodact from "./Basket/UpdateCountProdact";
import sumpriceposition from "./Basket/SumPricePosition";
import deleteposition from "./Basket/DeletePosition";
import cleaningbasket from "./Basket/CleaningBasket";
import getpositionsinbasket from "./Basket/getPositionsInBasket";

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
app.use(addproductrouter);
app.use(updateuserinfo);
app.use(updatepassword);
app.use(filter);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(getNameSubcategory);
app.use(isproductinbasket);
app.use(addinbasket);
app.use(getsumbasket);
app.use(updatecountprodact);
app.use(sumpriceposition);
app.use(deleteposition);
app.use(cleaningbasket);
app.use(getpositionsinbasket);

const port = 3000;
app.listen(port, (err?: unknown)=> {
    if(err){
        console.log(err);
    } else {
        console.log(`start port: ${port}`);
    }
})