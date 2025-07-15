import { pool } from '../../ConfConst/DB';


interface ISpecifications{
    name: string;
    value: number;
}

const updatespec = async (id_subcategory: number, specification: ISpecifications, id_subcategoryspec: number) => {

    try {
        const ResultUpdateSpec = await pool.query(`
            UPDATE "subcategory_spec_${id_subcategory}"
            SET ${specification.name} = ${specification.value}
            WHERE id = ${id_subcategoryspec}`);

        return id_subcategoryspec;
    } catch (error) {
        console.log("Ошибка при добавлении новых характеристик продукта:", error);
    }
}

export default updatespec;