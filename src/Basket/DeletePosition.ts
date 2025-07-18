import express from 'express';
import { pool } from '../ConfConst/DB';

const deleteposition = express.Router();

deleteposition.delete(`/deleteposition/:id_position`, async(req, res) => {
    const id_position = req.params.id_position;

    try {
        const QueryDeletePosition = pool.query(`
            DELETE FROM basket 
            WHERE id = $1;`,
            [id_position]
        )
        
        res.json('OK');
    } catch (error) {
        console.log("Ошибка при удалении позиции корзины");
        res.status(400);
    }
})

export default deleteposition;