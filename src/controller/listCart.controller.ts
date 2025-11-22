import { Request, Response } from "express";
import { db } from "../db";
import { getMe } from "./user.controller";

export async function listCart(req: Request, res: Response) {
  try {
    const result = await db.query("SELECT * FROM cart");
    res.json({
      data: result.rows,
      message: "Carrinho encontrado",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao buscar carrinho",
      success: false,
    });
  }
}

export async function MultipleSendItens(req: Request, res: Response) {
  try {
    const { quantidade, itemName } = req.body;

    const verifica = await db.query(
      "SELECT * FROM cart WHERE nomeitem = ($1)",
      [itemName]
    );
    if (verifica.rows.length > 0) {
      return res.status(400).json({
        message: "item ja existe no carrinho",
        sucesso: false,
      });
    }

    const result = await db.query(
      "INSERT INTO cart (quantidade, nomeitem) VALUES ($1, $2) RETURNING *",
      [quantidade, itemName]
    );
    res.status(201).json({
      data: result.rows,
      message: "Item cadastrado com sucesso",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao cadastrar item",
      success: false,
    });
  }
}

export async function AddOneItemCart(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const verifica = await db.query("SELECT * FROM cart WHERE id = ($1)", [id]);
    if (verifica.rows.length === 0) {
      return res.status(400).json({
        message: "item nao encontrado, id nao existe",
        sucesso: false,
      });
    }

    const result = await db.query(
      "UPDATE cart SET quantidade = quantidade + 1 WHERE id = ($1)",
      [id]
    );
    res.status(201).json({
      data: result.rows,
      message: "Quantidade atualizada com sucesso",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao atualizar item",
      success: false,
    });
  }
}

export async function RemoveOneItemCart(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const verifica = await db.query("SELECT * FROM cart WHERE id = ($1)", [id]);
    if (verifica.rows.length === 0) {
      return res.status(400).json({
        message: "item nao encontrado, id nao existe",
        sucesso: false,
      });
    }

    if (verifica.rows[0].quantidade === 1) {
      return res.status(400).json({
        message: "quantidade nao pode ser menor que 1",
        sucesso: false,
      });
    }

    const result = await db.query(
      "UPDATE cart SET quantidade = quantidade - 1 WHERE id = ($1)",
      [id]
    );
    res.status(201).json({
      data: result.rows,
      message: "Quantidade atualizada com sucesso",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao atualizar item",
      success: false,
    });
  }
}

export async function DeleteProductCart(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const result = await db.query("DELETE FROM cart WHERE id = ($1)", [id]);
    res.status(201).json({
      data: result.rows,
      message: "Item deletado com sucesso",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Erro ao deletar item",
      success: false,
    });
  }
}

export async function ClearCart() {
  const result = await db.query("DELETE FROM cart");
}

export async function SubmitCart(req: Request, res: Response) {
  try {
    const { 
      user_id, 
      nome_user, 
      item_id, 
      nome_item,
      tipo_movimentacao,
      quantidade
    } = req.body;
    const result = await db.query(
      "SELECT public.movimenta_estoque($1, $2, $3, $4, $5, $6)",
      [user_id, nome_user, item_id, nome_item, tipo_movimentacao, quantidade]
    );

    ClearCart();

    res.status(201).json({
      data: result.rows,
      message: "Compra realizada com sucesso",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: err.message | "Erro ao realizar compra",
      success: false,
    });
  }
}
