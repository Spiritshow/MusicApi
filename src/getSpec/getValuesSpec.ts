import express from 'express';
import { pool } from '../ConfConst/DB';
import { QueryResult } from 'pg';
import { IValuesSpec } from './helpers/Types';

const valuesSpecRouter = express.Router();

valuesSpecRouter.get('/valuesSpec/:name_spec', async (req,res) => {
    const name_spec = req.params.name_spec;

    try {
        const valuesSpec:QueryResult<IValuesSpec> = await pool.query(`SELECT * FROM ${name_spec}`);
        res.json(valuesSpec.rows);
    } catch (error) {
        console.log("Ошибка при выдаче значений характеристик:", error);
        res.status(500).json({ message: "Ошибка сервера при выдаче значений характеристик" });
    }
})

export default valuesSpecRouter;