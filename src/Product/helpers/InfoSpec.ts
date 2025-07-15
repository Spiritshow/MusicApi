import { QueryResult } from "pg";
import { pool } from "../../ConfConst/DB";

const infoSpec = async (tableName: string, productId: string) => {
    const req: QueryResult<any> = await pool.query(`
        SELECT * FROM ${tableName} WHERE id_product = $1;
    `, [productId]);
    
    return req.rows[0];
}

export default infoSpec;