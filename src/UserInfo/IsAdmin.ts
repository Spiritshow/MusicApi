import express from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import JWT_SECRET from "../ConfConst/SecretKey";


const isAdminRouter = express.Router();

isAdminRouter.get('/isAdmin', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Нет токена" });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err:VerifyErrors | null, user: unknown) => {
        if (err || !user) {
            res.status(403).json({ message: "Недействительный токен" });
            return;
        }
        if (typeof user === "object" && "id" in user && "username" in user) {
            if (user.username === "vkozyaychev@mail.ru") {
                res.json(true);
            }else{
                res.json(false);
            }
        } else {
            res.status(403).json({ message: "Недействительный токен" });
        }
    })
})

export default isAdminRouter;