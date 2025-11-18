import { Router } from "express";
import { listStock } from "../controller/listStock.controller";

const routerListStock = Router();

routerListStock.get("/getStock", listStock);

export default routerListStock;
