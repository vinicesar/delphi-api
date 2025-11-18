import { Request, Response } from "express";
import { db } from "../db";

export async function listStock(req: Request, res: Response) {
  try {
    const result = await db.query("SELECT * FROM estoque");
    res.json({
      data: result.rows,
      message: "Estoque encontrado",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao buscar estoque",
      success: false,
    });
  }
}
