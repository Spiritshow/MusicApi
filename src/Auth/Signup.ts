import express  from "express";
import { pool } from "../ConfConst/DB";
import bcrypt from "bcrypt";
import { ISignUp } from "../Types/User";

const signUp = express.Router();

signUp.post('/SignUp', async (req, res) => {
    const {
    FIO,
    nickname,
    numberPhone,
    address,
    email,
    birthday,
    password
  }:ISignUp = req.body;

  if (!FIO || !address || !email || !password) {
    res.status(400).json({ message: "Заполните обязательные поля: FIO, address, email, password" });
    return;
  }

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE username = $1", [email]);
    if (existingUser.rows.length > 0) {
      res.status(409).json({ message: "Пользователь с таким email уже существует" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInsertResult = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [email, hashedPassword]
    );

    const userId = userInsertResult.rows[0].id;

    await pool.query(
      `INSERT INTO user_info 
        (id_user, FIO, nickname, numberPhone, address, email, birthday)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, FIO, nickname || null, numberPhone || null, address, email, birthday || null]
    );

    res.status(201).json({ message: "Регистрация прошла успешно" });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ message: "Ошибка сервера при регистрации" });
  }

})

export default signUp;