import { QueryResult } from 'pg';
import { pool } from '../ConfConst/DB';

interface IResQuery{
    id: number
}

const addsubcategory = async (name: string, id_category: number, img: string[]) => {

    try {
        const resultAddSubcategory: QueryResult<IResQuery> = await pool.query(`
            INSERT INTO subcategory(id_category, name, img) VALUES ($1, $2, $3) RETURNING id
        `,[id_category, name, img])

        const resultUpdateName_db = await pool.query(`
            UPDATE subcategory 
            SET name_db='subcategory_spec_${resultAddSubcategory.rows[0].id}'
            WHERE id=${resultAddSubcategory.rows[0].id}
        `)

        return(resultAddSubcategory.rows[0].id)
    } catch (error) {
        console.log("Ошибка при добавлении новой подкатегории:", error);
    }
}

export default addsubcategory;