import express from 'express';
import { authenticateToken, IReqAuth } from '../UserInfo/helpers';
import { pool } from '../ConfConst/DB';

const getsumbasket = express.Router();

interface ISumBasket{
    sum: number;
    countProducts: number
}


getsumbasket.get('/getsumbasket', authenticateToken,async (req: IReqAuth, res) => {
    const id_user = req.user?.id;
    try {
        const Result = await pool.query<ISumBasket>(`
            SELECT 
                COUNT(b.id) AS countProducts,
                SUM(p.price * b.count) AS sum
            FROM basket b
            JOIN product p ON b.id_product = p.id
            WHERE b.id_user = $1;`, [id_user]);
        res.json(Result.rows[0]);
    } catch (error) {
        console.log("Ошибка при попытке достать сумму корзины" + error);
        res.json({sum: 0, countProducts: 0})
    }

})

export default getsumbasket;