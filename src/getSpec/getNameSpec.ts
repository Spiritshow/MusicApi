import express from 'express';
import { pool } from '../ConfConst/DB';
import { INameSpec } from './helpers/Types';
import { QueryResult } from 'pg';

const nameSpecRouter = express.Router();

nameSpecRouter.get('/nameSpec/:subcategory', async (req,res) => {
    const subcategory = req.params.subcategory;

    try {
        const nameSpec: QueryResult<INameSpec> = await pool.query(`SELECT * FROM ConfSpec WHERE subcategory = $1`, [subcategory]);

        res.json(nameSpec.rows);
    } catch (error) {
        console.log("Ошибка при выдаче характеристик:", error);
        res.status(500).json({ message: "Ошибка сервера при выдаче характеристик" });
    }
})

export default nameSpecRouter;