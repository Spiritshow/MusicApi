import express  from "express";
import loginRouter from "./Auth/Login";
import cookieParser from "cookie-parser";
import signUp from "./Auth/Signup";
import userInfo from "./UserInfo/UserInfo";
import checkCookie from "./UserInfo/CheckCookie";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(loginRouter);
app.use(signUp);
app.use(userInfo);
app.use(checkCookie);

const port = 3000;
app.listen(port, (err?: unknown)=> {
    if(err){
        console.log(err);
    } else {
        console.log(`start port: ${port}`);
    }
})