import { Router } from "express";
import playlistController from "../controllers/playlistController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Gerenciamento das músicas das salas
 */

/**
 * @swagger
 * /api/playlist:
 *   get:
 *     summary: Lista todas as playlists ou músicas disponíveis
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: Lista carregada.
 */
router.get("/", playlistController.listarPlaylists || playlistController.index);

/**
 * @swagger
 * /api/playlist:
 *   post:
 *     summary: Adiciona uma nova música/link à playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - url
 *             properties:
 *               titulo:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Música adicionada com sucesso.
 */
router.post("/", playlistController.adicionarMusica || playlistController.store);

/**
 * @swagger
 * /api/playlist/{id}:
 *   get:
 *     summary: Busca uma música específica da playlist por ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Música encontrada.
 */
router.get("/:id", playlistController.buscarPorId || playlistController.show || ((req, res) => res.json({})));

/**
 * @swagger
 * /api/playlist/{id}:
 *   put:
 *     summary: Atualiza informações de uma música na playlist
 *     tags: [Playlists]
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
 *               titulo:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Música atualizada com sucesso.
 */
router.put("/:id", playlistController.atualizar || playlistController.update || ((req, res) => res.json({})));

/**
 * @swagger
 * /api/playlist/{id}:
 *   delete:
 *     summary: Remove uma música da playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Música removida com sucesso.
 */
router.delete("/:id", playlistController.deletar || playlistController.delete || ((req, res) => res.json({})));

export default router;