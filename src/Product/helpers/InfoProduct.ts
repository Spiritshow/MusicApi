import { QueryResult } from "pg";
import { pool } from "../../ConfConst/DB";

const infoProduct = async (productId: string) => {
    const req:QueryResult<any> = await pool.query(`
        SELECT 
            p.id,
            p.name,
            p.price,
            array_agg(i.img) AS img,
            p.description,
            p.count,
            s.name AS subcategoryname,
            s.name_db AS subcategorytable
        FROM 
            product p
        LEFT JOIN subcategory s ON p.subcategory = s.id
        LEFT JOIN img i ON p.id = i.id_product
        WHERE p.id = $1
        GROUP BY 
            p.id, s.name, s.name_db;
    `, [productId]);
    
    return req.rows[0];
}

export default infoProduct;