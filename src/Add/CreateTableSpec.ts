import express from 'express';
import { pool } from '../ConfConst/DB';


const createtablespec = async (id_subcategory: number) => {
    try {
        const resultCreateTableValuesSpec = await pool.query(`
            CREATE TABLE "subcategory_spec_${id_subcategory}" ( id SERIAL PRIMARY KEY, id_product integer REFERENCES product(id))
        `)

        return (id_subcategory);
    } catch (error) {
        console.log("Ошибка при добавлении нового названия характеристики:", error);
    }
}

export default createtablespec;