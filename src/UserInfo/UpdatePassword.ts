import express, { Request, Response } from 'express';
import { pool } from '../ConfConst/DB';
import { authenticateToken, IReqAuth } from './helpers';
import bcrypt from "bcrypt";

const updatepassword = express.Router();

interface IUpdatePassword {
    password?: string
}

updatepassword.post('/changepassword',authenticateToken, async (req: IReqAuth<IUpdatePassword>, res: Response) => {
    const value = req.body.password;
    const user = req.user;

    if(typeof value === "undefined") {
        res.json({massege: "Введите пароль"})
        return;
    }

    const password = await bcrypt.hash(value, 10);

    if(typeof user === "undefined") {
        res.json({massege: "Ошибка при изменении даннх о пользователе"})
        return;
    }
    try {
        await pool.query(`
            UPDATE users
            SET password='$1'
            WHERE id=${user.id};`,
            [password])

        res.json({massege: "Изменено!"})
    } catch (error) {
        console.log("Ошибка при изменении даннх о пользователе:", error);
    }
})

export default updatepassword;