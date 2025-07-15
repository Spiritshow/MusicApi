import express from 'express';
import { pool } from '../ConfConst/DB';

const subcategory = express.Router();


subcategory.get("/getSubcategors/:id_category", async (req, res) => {
    const id_category = req.params.id_category;
    try {
        const subcategors = await pool.query(`SELECT * FROM subcategory WHERE id_category = $1`, [id_category]);

        res.json(subcategors.rows);
    } catch (error) {
        console.log("Ошибка при выдаче подкатегорий:", error);
        res.status(500).json({ message: "Ошибка сервера при выдаче подкатегорий" });
    }
})

export default subcategory;