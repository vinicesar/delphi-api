import { Router } from "express";
import { listHistory } from "../controller/listHistory.controller";

const routerListHistory = Router();

routerListHistory.get("/getHistory", listHistory);

export default routerListHistory;
