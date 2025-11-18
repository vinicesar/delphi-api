import { Request, Response } from "express";
import { db } from "../db";

export async function getAllItems(req: Request, res: Response) {
  try {
    const result = await db.query("SELECT * FROM itens");
    res.json({
      data: result.rows,
      message: "Itens encontrados",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao buscar itens",
      success: false,
    });
  }
}

export async function addItemInItens(req: Request, res: Response) {
  const { nome } = req.body;
  const nomeSemEspaco = nome.trim();

  try {
    const verifica = await db.query("SELECT * FROM itens WHERE nome = ($1)", [
      nomeSemEspaco,
    ]);
    if (verifica.rows.length > 0) {
      return res.status(400).json({
        message: "item ja existe",
        sucesso: false,
      });
    }
    const result = await db.query(
      "INSERT INTO itens (nome) VALUES ($1) RETURNING *",
      [nomeSemEspaco]
    );
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao cadastrar item",
      success: false,
    });
  }
}

export async function editItem(req: Request, res: Response) {
  const { id, nameItem } = req.body;

  const name = nameItem.trim();

  try {
    const verifica = await db.query("SELECT * FROM itens WHERE id = ($1)", [
      id,
    ]);
    if (verifica.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "item nao encontrado, id nao existe",
      });
    }
    const verificaName = await db.query(
      "SELECT * FROM itens WHERE nome = ($1)",
      [name]
    );
    if (verificaName.rows.length !== 0) {
      return res.status(400).json({
        success: false,
        message: "ja existe um item com esse nome",
      });
    }

    const result = await db.query(
      "UPDATE itens SET nome = ($1) WHERE id = ($2)",
      [name, id]
    );

    return res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "item editado com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "erro ao editar item",
      success: false,
    });
  }
}
