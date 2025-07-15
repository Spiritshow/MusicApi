import { QueryResult } from "pg";
import { pool } from "../../ConfConst/DB";

const translatorSpec = async (rawSpec: Record<string, any>): Promise<Record<string, any>> => {
  const resolved: Record<string, string | number> = {};

  for (const [field, value] of Object.entries(rawSpec)) {
    if (field === 'id_product' || field === 'id') {
      resolved[field] = value;
      continue;
    }

    try {
      const req:QueryResult<any> = await pool.query(`
        SELECT name FROM ${field} WHERE id = $1;
      `, [value]);

      resolved[field] = req.rows[0]?.name || null;
    } catch (error) {
      console.log(`Не удалось разрешить поле ${field}:`, error);
      resolved[field] = value; 
    }
  }

  return resolved;
}

export default translatorSpec;