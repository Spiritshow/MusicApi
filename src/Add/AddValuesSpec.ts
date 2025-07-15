import { QueryResult } from 'pg';
import { pool } from '../ConfConst/DB';

interface IResQuery{
    id: number
}

const addvaluespec = async (namespec: string, value: string) => {

    try {
        const resultAddValueSpec: QueryResult<IResQuery> = await pool.query(`
            INSERT INTO "${namespec}"(name) VALUES ($1) RETURNING id
        `,[value])

        return(resultAddValueSpec.rows[0].id)
    } catch (error) {
        console.log("Ошибка при добавлении значения характеристики:", error);
    }
}

export default addvaluespec;