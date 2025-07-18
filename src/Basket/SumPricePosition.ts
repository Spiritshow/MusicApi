import express from 'express';
import { pool } from '../ConfConst/DB';

const sumpriceposition = express.Router();

interface IQuerySumPricePosition {
    sumprice: number;
}

sumpriceposition.get('/sumpriceposition/:id_position', async(req, res) => {
    const id_position = req.params.id_position;

    try {
        const QuerySumPricePosition = await pool.query<IQuerySumPricePosition>(`
            SELECT SUM(p.price * b.count) AS sumprice
            FROM basket b
            JOIN product p ON b.id_product = p.id
            WHERE b.id = $1;`,
            [id_position]
        )
        res.json(QuerySumPricePosition.rows[0].sumprice)
    } catch (error) {
        console.log("Ошибка при получении цены позиции в корзине" + error)
        res.status(400).json(error);
    }
})

export default sumpriceposition;