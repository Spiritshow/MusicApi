import express, { Request, Response } from "express";
import generateToken from "./helpers";
import { pool } from "../ConfConst/DB";
import bcrypt from "bcrypt";
import { IUser } from "../Types/User";

const login = express.Router();

login.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, username, password FROM users WHERE username = $1',
      [username]
    );

    const user: IUser = result.rows[0];

    if (!user) {
      res.status(401).json({ message: "Неверный логин или пароль" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Неверный логин или пароль" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Успешный вход" });

  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

login.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Выход выполнен" });
});



export default login;