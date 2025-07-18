import express, { Request, Response } from 'express';
import { IReq } from '../Types/Types';
import { pool } from '../ConfConst/DB';

const filter = express.Router();

interface ISpecValues {
    id: number,
    name: string
}

interface IFilterSpec {
  name: string;
  name_db: string;
  value: ISpecValues;
}

interface IReqFilter{
    subcategory: number;
    filterSpec: IFilterSpec[];
}

interface ICardProduct{
    id: number,
    name: string,
    price: number,
    img: string,
    subcategory: number;
}

filter.post('/Filter', async (req: IReq<IReqFilter>, res: Response) => {
    const {subcategory, filterSpec} = req.body;
    try {
        if(filterSpec.length === 0) {
            const resultFilterEmpty = await pool.query<ICardProduct>(`
                SELECT 
                    p.id,
                    p.name,
                    p.price,
                    (SELECT i.img FROM img i WHERE i.id_product = p.id LIMIT 1) as img,
                    p.subcategory
                FROM product p
                WHERE subcategory=${subcategory}
            `);
            res.json(resultFilterEmpty.rows)
        }else{
            var query = 
            `SELECT 
                p.id,
                p.name,
                p.price,
                (SELECT i.img FROM img i WHERE i.id_product = p.id LIMIT 1) as img,
                p.subcategory
            FROM product p
            LEFT JOIN subcategory_spec_${subcategory} ss ON p.id = ss.id_product
            WHERE 
            `;

            const values: number[] = [];
            const conditions: string[] = [];

            filterSpec.forEach((fs, index) => {
                conditions.push(`ss.${fs.name_db} = $${index + 1}`);
                values.push(fs.value.id);
            });

            query += conditions.join(' AND ');

            const resultFilter = await pool.query<ICardProduct>(query,values);
            res.json(resultFilter.rows)
        }
    } catch (error) {
        console.log("Ошибка при получении отфильтрованных продуктов:", error);
    }
    
})

export default filter;