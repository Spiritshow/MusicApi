import { pool } from "../../ConfConst/DB";


const getValuesSpec = async (name: string, value: number) => {

    try {
        const valuesSpec = await pool.query(`SELECT name FROM ${name} WHERE id=$1`,[value]);
        if(valuesSpec.rows.length > 0){return(valuesSpec.rows[0].name);}
        else{return("Нет значения")}
    } catch (error) {
        console.log("Ошибка при выдаче значений характеристик:", error);
    }
}

export default getValuesSpec;