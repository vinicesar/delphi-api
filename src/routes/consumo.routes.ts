import { Router } from "express";
import { submitConsumo } from "../controller/consumo.controller";


const routerConsumo = Router();

routerConsumo.post("/SubmitConsumo", submitConsumo)

export default routerConsumo;