import { Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export async function getAllUsers(res: Response) {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json({
      data: result.rows,
      message: "Usuários encontrados com sucesso",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao buscar usuários",
      success: false,
    });
  }
}

export async function createUser(req: Request, res: Response) {
  const { nome, login, senha } = req.body;

  try {
    const all = await db.query("SELECT * FROM users");
    if (all.rows.find((user) => user.nome === login) !== undefined) {
      return res.status(400).json({
        message: "Usuário já existe",
        success: false,
      });
    }
    const result = await db.query(
      "INSERT INTO users (nome, password, login) VALUES ($1, $2, $3) RETURNING *",
      [nome, senha, login]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao criar usuário",
      success: false,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { login, senha } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE login = $1 AND password = $2 LIMIT 1",
      [login, senha]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Usuário ou senha inválidos",
        success: false,
      });
    }

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, login: user.login, nome: user.nome },
      SECRET,
      { expiresIn: "12h" }
    );

    res.status(201).json({
      token,
      user: { id: user.id, login: user.login, nome: user.nome },
      message: "Login realizado com sucesso",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao realizar login",
      success: false,
    });
  } finally {
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    res.json({
      data: req.user,
      message: "Dados do usuario autenticado",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao buscar dados usuario",
      sucesse: false,
    });
  }
}
