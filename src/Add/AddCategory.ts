import { QueryResult } from 'pg';
import { pool } from '../ConfConst/DB';

interface IResQuery{
    id: number
}

const addcategory = async (name: string) => {

    try {
        const resultAddCategory:QueryResult<IResQuery> = await pool.query(`INSERT INTO category(name) VALUES ($1) RETURNING id`,[name])
        return resultAddCategory.rows[0].id
    } catch (error) {
        console.log("Ошибка при добавлении новой категории:", error);
    }
}

export default addcategory;