import { pool } from '../ConfConst/DB';


const createtablevaluesspec = async (id_namespec: number) => {

    try {
        const resultCreateTableValuesSpec = await pool.query(`
            CREATE TABLE "spec_${id_namespec}" ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL)`)
        return(id_namespec);
    } catch (error) {
        console.log("Ошибка при добавлении нового названия характеристики:", error);
    }
}

export default createtablevaluesspec;