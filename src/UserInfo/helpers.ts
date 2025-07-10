import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import JWT_SECRET from "../ConfConst/SecretKey";
import { IJWTUser } from "../Types/User";


export interface IReqAuth extends Request {
    user?: IJWTUser
}

export function authenticateToken(req: IReqAuth, res: Response, next: NextFunction) {
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
        req.user = user as IJWTUser;
        next();
    } else {
        res.status(403).json({ message: "Недействительный токен" });
    }
  });
}