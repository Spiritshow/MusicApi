import { QueryResult } from 'pg';
import { pool } from '../ConfConst/DB';

interface IResQuery{
    id: number
}

const addnamespec = async (name: string, subcategory: number) => {

    try {
        const resultAddNameSpec: QueryResult<IResQuery> = await pool.query(`
            INSERT INTO ConfSpec(name, subcategory) VALUES ($1, $2) RETURNING id
        `,[name, subcategory])

        const resultUpdateName_db = await pool.query(`
            UPDATE ConfSpec
            SET name_db = 'spec_${resultAddNameSpec.rows[0].id}'
            WHERE id = ${resultAddNameSpec.rows[0].id}
        `)

        return(resultAddNameSpec.rows[0].id)
    } catch (error) {
        console.log("Ошибка при добавлении нового названия характеристики:", error);
    }
}

export default addnamespec;