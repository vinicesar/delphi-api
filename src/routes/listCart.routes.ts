import { Router } from "express";
import {
  AddOneItemCart,
  ClearCart,
  DeleteProductCart,
  listCart,
  MultipleSendItens,
  RemoveOneItemCart,
  SubmitCart,
} from "../controller/listCart.controller";

const routerListCart = Router();

routerListCart.get("/getCart", listCart);

routerListCart.post("/multipleSendItens", MultipleSendItens);

routerListCart.post("/AddOneItem", AddOneItemCart);

routerListCart.post("/ClearCart", ClearCart);

routerListCart.post("/DeleteItem", DeleteProductCart);

routerListCart.post("/RemoveOneItem", RemoveOneItemCart);

routerListCart.post("/SubmitCart", SubmitCart);

export default routerListCart;
