import express from 'express';
import { IReq } from '../Types/Types';
import { pool } from '../ConfConst/DB';

const updatecountprodact = express.Router();

interface IUpdateCountProdact {
    value: number,
    id_position: number
}

interface IQueryMaxCount{
    maxcount: number
}

interface IQueryUpdateCount{
    count:number
}

updatecountprodact.patch('/updatecountprodact', async (req: IReq<IUpdateCountProdact>, res) => {
    const value = req.body.value;
    const id_position = req.body.id_position;

    try {
        const QueryMaxCount = await pool.query<IQueryMaxCount>(`
            SELECT
	            p.count AS maxcount
            FROM
                basket b
            LEFT JOIN product p ON b.id_product = p.id
            WHERE b.id=$1;`,
            [id_position]
        )
        
        const newCount = QueryMaxCount.rows[0].maxcount > value ? value : QueryMaxCount.rows[0].maxcount;

        const QueryUpdateCount = await pool.query<IQueryUpdateCount>(`
            UPDATE basket
            SET count=$1
            WHERE id=$2 RETURNING count;`,
            [newCount,id_position]
        );
        res.json(QueryUpdateCount.rows[0].count)

    } catch (error) {
        console.log("Ошибка при изменении количевтва продукта в корзине:" + error)
        res.status(500).json({massege: "Ошибка при изменении количевтва продукта в корзине"})
    }

})

export default updatecountprodact;