import express from 'express';
import { pool } from '../ConfConst/DB';


interface ICreateSpec {
    id: number,
    spec: number
}

const addcolumntablespec = async (id_subcategory: number, id_namespec: number) => {

    try {
        const resultAddColumnTableSpec = await pool.query(`
            ALTER TABLE "subcategory_spec_${id_subcategory}" 
            ADD COLUMN "spec_${id_namespec}" integer REFERENCES "spec_${id_namespec}"(id);
        `)

        return(id_subcategory);
    } catch (error) {
        console.log("Ошибка при добавлении новой характеристики в таблицу:", error);
    }
}

export default addcolumntablespec;