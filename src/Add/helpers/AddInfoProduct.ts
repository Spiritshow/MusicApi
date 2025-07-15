import { QueryResult } from 'pg';
import { pool } from '../../ConfConst/DB';


interface IResQuery{
    id: number
}

const addinfoproduct = async (name: string, price: number, description: string, count: number, id_subcategory: number) => {

    try {
        const id_product:QueryResult<IResQuery> = await pool.query(`
            INSERT INTO product(name, price, description, count, subcategory)
            VALUES ($1, $2, $3, $4, $5) RETURNING id;`,[name, price, description, count, id_subcategory]);
        return id_product.rows[0].id
    } catch (error) {
        console.log("Ошибка при добавлении новой категории:", error);
    }
}

export default addinfoproduct;