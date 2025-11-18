import { Request, Response } from "express";
import { db } from "../db";

export async function listHistory(req: Request, res: Response) {
  try {
    const result = await db.query("SELECT * FROM historico");
    res.json({
      data: result.rows,
      message: "Historico encontrado",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao buscar historico",
      success: false,
    });
  }
}
