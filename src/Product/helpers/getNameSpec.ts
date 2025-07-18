import { pool } from '../../ConfConst/DB';


const getNameSpec = async (name_db: string) => {
    try {
        const nameSpec = await pool.query(`SELECT name FROM ConfSpec WHERE name_db = $1`, [name_db]);
        return(nameSpec.rows[0].name);
    } catch (error) {
        console.log("Ошибка при выдаче характеристик:", error);
    }
}

export default getNameSpec;