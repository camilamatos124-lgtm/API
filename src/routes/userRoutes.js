import { Router } from "express";
import userController from "../controllers/userController.js";
// Se tiver os middlewares de proteção, importe-os aqui:
// import { protegerRota, verificarRole } from "../middlewares/permissionsMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Sistema de Autenticação e Gestão de Usuários (Aulas 18, 19 e 21)
 */

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Registra um novo usuário (Senha criptografada com Bcrypt)
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
 *         description: Usuário criado com sucesso.
 *       409:
 *         description: Este e-mail já está em uso.
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Realiza o login e gera o Token JWT
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
 *         description: Login realizado com sucesso. Retorna o Token JWT.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista obtida com sucesso.
 */
router.get("/", userController.listar || ((req, res) => res.json([])));

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID único
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário no MongoDB
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.get("/:id", userController.buscarPorId || ((req, res) => res.json({})));

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 */
router.put("/:id", userController.atualizar || ((req, res) => res.json({})));

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário do sistema
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 */
router.delete("/:id", userController.deletar || ((req, res) => res.json({})));

export default router;