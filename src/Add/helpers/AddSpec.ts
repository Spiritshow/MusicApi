import { QueryResult } from 'pg';
import { pool } from '../../ConfConst/DB';


interface IResQuery{
    id: number
}

const addspec = async (id_subcategory: number, id_product: number) => {

    try {

        const id_subcategoryspec:QueryResult<IResQuery> = await pool.query(`
            INSERT INTO "subcategory_spec_${id_subcategory}"(id_product) 
            VALUES (${id_product}) RETURNING id;
        `);

        return id_subcategoryspec.rows[0].id
    } catch (error) {
        console.log("Ошибка при добавлении новых характеристик продукта:", error);
    }
}

export default addspec;