import express from 'express';
import { pool } from '../ConfConst/DB';
import { authenticateToken } from './helpers';

const updateuserinfo = express.Router();

interface IUpdateUserInfo {
    id: number,
    fio: string,
    nickname: string,
    numberphone: number,
    address: string,
    email: string,
    birthday: Date
}

updateuserinfo.post('/changeuserinfo',authenticateToken, async (req, res) => {
    const formdata: IUpdateUserInfo = req.body;
    try {
        await pool.query(`
            UPDATE user_info
            SET fio='$1', nickname='$2', numberphone='$3', address='$4', email='$5', birthday='$6'
            WHERE id=${formdata.id};`,
            [formdata.fio, formdata.nickname, formdata.numberphone, formdata.address, formdata.email, formdata.birthday])

        res.json({massege: "Изменено!"})
    } catch (error) {
        console.log("Ошибка при изменении даннх о пользователе", error);
    }
    
})

export default updateuserinfo;
