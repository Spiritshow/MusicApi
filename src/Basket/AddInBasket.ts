import express from 'express';
import { authenticateToken, IReqAuth } from '../UserInfo/helpers';
import { pool } from '../ConfConst/DB';

const addinbasket = express.Router();

interface IAddInBasket {
    id_product: number
}

addinbasket.post('/addinbasket',  authenticateToken, async (req: IReqAuth<IAddInBasket>, res) => {
    const id_product = req.body.id_product;
    const id_user = req.user?.id;

    try {
        const Result = await pool.query(`
            INSERT INTO basket
            (id_user, id_product, count)
            VALUES($1, $2, 1) 
            RETURNING id`,[id_user, id_product]
        )

        res.json(Result.rows[0])
    } catch (error) {
        console.log("Ошибка при добавлении продукта в корзину:", error);
    }
})

export default addinbasket;