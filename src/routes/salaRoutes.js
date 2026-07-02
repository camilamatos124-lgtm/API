import { Router } from "express";
import salaController from "../controllers/salaController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Gerenciamento de Salas de Música
 */

/**
 * @swagger
 * /api/salas:
 *   get:
 *     summary: Retorna a lista de todas as salas abertas
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Sucesso ao obter salas.
 */
router.get("/", salaController.listarSalas || salaController.index);

/**
 * @swagger
 * /api/salas:
 *   post:
 *     summary: Cria uma nova sala de música
 *     tags: [Salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sala criada com sucesso.
 */
router.post("/", salaController.criarSala || salaController.store);

/**
 * @swagger
 * /api/salas/{id}:
 *   get:
 *     summary: Obtém os detalhes de uma sala específica por ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da sala retornados.
 *       404:
 *         description: Sala não encontrada.
 */
router.get("/:id", salaController.buscarPorId || salaController.show || ((req, res) => res.json({})));

/**
 * @swagger
 * /api/salas/{id}:
 *   put:
 *     summary: Atualiza os dados de uma sala (Nome, descrição, etc)
 *     tags: [Salas]
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
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso.
 */
router.put("/:id", salaController.atualizar || salaController.update || ((req, res) => res.json({})));

/**
 * @swagger
 * /api/salas/{id}:
 *   delete:
 *     summary: Remove/Deleta uma sala definitiva do banco
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sala deletada com sucesso.
 */
router.delete("/:id", salaController.deletar || salaController.delete || ((req, res) => res.json({})));

export default router;