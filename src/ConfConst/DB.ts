import {Pool} from "pg";

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MusicStyle',
  password: '1502',
  port: 5432,
});