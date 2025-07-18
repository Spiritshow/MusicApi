import express from 'express';
import { pool } from '../ConfConst/DB';

const getNameSubcategory = express.Router();

getNameSubcategory.get('/getNameSubcategory/:id_subcategory', async (req, res) => {
    const id_subcategory = req.params.id_subcategory;
    try {
        const Result = await pool.query('SELECT name FROM subcategory WHERE id=$1', [id_subcategory])
        res.json(Result.rows[0].name);
    } catch (error) {
        console.log("Ошибка при выдаче значений характеристик:", error);
    }
})

export default getNameSubcategory;