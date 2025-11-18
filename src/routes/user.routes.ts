import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getMe,
  loginUser,
} from "../controller/user.controller";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/users", getAllUsers);

router.post("/users/login", loginUser);

router.post("/users", createUser);

router.get("/me", authenticateToken, getMe)

export default router;
