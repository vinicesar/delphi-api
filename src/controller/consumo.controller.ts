import { Request, Response } from "express";
import { db } from "../db";

export async function submitConsumo(req: Request, res: Response) {
  try {
    const {
      user_id,
      nome_user,
      item_id,
      nome_item,
      tipo_movimentacao,
      quantidade,
    } = req.body;
    const result = await db.query(
      "SELECT public.movimenta_estoque($1, $2, $3, $4, $5, $6)",
      [user_id, nome_user, item_id, nome_item, tipo_movimentacao, quantidade]
    );

    res.status(201).json({
      data: result.rows,
      message: "Consumo descontado",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao atualizar Consumo",
      success: false,
    });
  }
}
