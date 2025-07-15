import express from "express";
import { pool } from "../ConfConst/DB";

const category = express.Router();

category.get("/getCategors",async (req,res)=>{
    try {
        const categors = await pool.query(`SELECT * FROM category`);

        res.json(categors.rows)
    } catch (error) {
        console.log("Ошибка при выдаче категорий:", error);
        res.status(500).json({ message: "Ошибка сервера при выдаче категорий" });
    }
})

export default category;