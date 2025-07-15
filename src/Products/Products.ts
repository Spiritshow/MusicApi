import express from "express";
import { pool } from "../ConfConst/DB";

const productsCategory = express.Router();

productsCategory.get("/products/:category", async (req, res) => {
    const category = req.params.category;

    try {
        const products = await pool.query(`
            SELECT DISTINCT ON (p.id)
                p.id,
                p.name,
                p.price,
                p.subcategory,
                i.img
            FROM 
                product p
            LEFT JOIN 
                img i ON p.id = i.id_product
            WHERE 
                p.subcategory = $1
            ORDER BY 
                p.id, i.id;`
            , [category]
        )
        res.json(products.rows)
    } catch (error) {
        console.log("Ошибка при выдаче продуктов:", error);
        res.status(500).json({ message: "Ошибка сервера при при выдаче продуктов" });
    }
})

export default productsCategory;