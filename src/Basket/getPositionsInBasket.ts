import express from 'express';
import { authenticateToken, IReqAuth } from '../UserInfo/helpers';
import { pool } from '../ConfConst/DB';

const getpositionsinbasket = express.Router();

interface IPositionBasket{
    id: number,
    id_product: number,
    name_product: string,
    img: string,
    count: number
}

getpositionsinbasket.get(`/getpositionsinbasket`, authenticateToken, async(req: IReqAuth, res) => {
    const id_user = req.user?.id;

    try {
        const QueryGetPositions = await pool.query<IPositionBasket>(`
            SELECT 
                b.id,
                b.id_product,
                p.name AS name_product,
                (SELECT i.img FROM img i WHERE p.id = i.id_product LIMIT 1) as img,
                b.count
            FROM
                basket b
            LEFT JOIN product p ON b.id_product=p.id
            WHERE b.id_user=$1
            GROUP BY
                b.id,p.name,p.id;
            `,[id_user]
        )

        res.json(QueryGetPositions.rows)
    } catch (error) {
        console.log("Ошибка при получении позиций корзины" + error)
        res.status(400);
    }

})

export default getpositionsinbasket;