import { Router } from "express";
import {
  addItemInItens,
  editItem,
  getAllItems,
} from "../controller/listItens.controller";

const routerListItens = Router();

routerListItens.get("/getItens", getAllItems);

routerListItens.post("/addItem", addItemInItens);

routerListItens.post("/editItem", editItem);

export default routerListItens;
