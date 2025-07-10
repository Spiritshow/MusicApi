import express, { Response } from "express";
import { authenticateToken, IReqAuth } from "./helpers";
import { IUserInfo } from "../Types/User";
import { pool } from "../ConfConst/DB";

const userInfo = express.Router();

userInfo.get("/userInfo", authenticateToken, async (req: IReqAuth, res: Response) => {
    const user = req.user;

    try {
        const result = await pool.query(
            `SELECT id, FIO, nickname, numberPhone, address, email, birthday
            FROM user_info
            WHERE id_user = $1`,
            [user?.id]
        );

        const userInfo: IUserInfo = result.rows[0];
        if (!userInfo) {
            res.status(404);
            return;
        }

        res.json(userInfo);
    } catch (error) {
        console.log("userInfo: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

export default userInfo;