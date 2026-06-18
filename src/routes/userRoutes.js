import { Router } from "express";
import UserController from "../controllers/userController.js";

const usersRouter = Router();

// Rota aberta para criar conta
usersRouter.post("/register", UserController.register);

// Rota aberta para fazer login
usersRouter.post("/login", UserController.login);

export default usersRouter;