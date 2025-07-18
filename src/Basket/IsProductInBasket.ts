import express from 'express';
import { pool } from '../ConfConst/DB';
import { authenticateToken, IReqAuth } from '../UserInfo/helpers';

const isproductinbasket = express.Router();

interface IBasket{
    id: number,
    id_product: number,
    id_user: number,
    count: number
}

isproductinbasket.get('/isproductinbasket/:id_product', authenticateToken, async (req: IReqAuth,res) => {
    const id_product = req.params.id_product;
    const id_user = req.user?.id;
    try {
        const Result = await pool.query<IBasket>(`SELECT * FROM basket WHERE id_product=${id_product} AND id_user=${id_user}`);
        if(Result.rows.length > 0){
            res.json(true)
        }else{
            res.json(false)
        }
    } catch (error) {
        console.log("Ошибка при проверке продукта в корзине:", error);
        res.json(false);
    }
})

export default isproductinbasket;