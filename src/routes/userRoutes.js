import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Sistema de Autenticação e Criptografia (Aulas 18 e 21)
 */

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Registra um novo usuário na nuvem
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - password
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 default: user
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso (Senha criptografada com Bcrypt!)
 *       409:
 *         description: Este e-mail já está em uso.
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Realiza o login do usuário e gera o Token JWT
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso! Retorna o Token JWT.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post("/login", userController.login);

export default router;