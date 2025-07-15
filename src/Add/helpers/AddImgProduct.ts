import { QueryResult } from 'pg';
import { pool } from '../../ConfConst/DB';



const addimgproduct = async (id_product: number, img: string) => {

    try {
        const resultAddImgProduct = await pool.query(`
                INSERT INTO img(id_product, img)
                VALUES ($1, $2)`,[id_product, img]);

        return id_product;
    } catch (error) {
        console.log("Ошибка при добавлении новой категории:", error);
    }
}

export default addimgproduct;