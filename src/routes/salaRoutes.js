import express from "express";
import SalaController from "../controllers/salaController.js";
import { regrasValidacaoSala } from "../validators/salaValidator.js";
import { verificarErros } from "../middlewares/validatorMiddleware.js";
import { checkRole } from "../middlewares/permissionsMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /salas:
 *  get:
 *    summary: Retorna a lista de todas as salas
 *    responses:
 *      200:
 *        description: Lista de salas retornada com sucesso
 */
router.get("/", SalaController.listarSalas);
router.get("/view", SalaController.renderizarTelaSalas);
router.get("/:id", SalaController.buscarSalaPorId);

/**
 * @swagger
 * /salas:
 *  post:
 *    summary: Cria uma nova sala (Requer permissão de admin)
 *    parameters:
 *      - in: header
 *        name: role
 *        required: true
 *        schema:
 *        type: string
 *        description: Digite 'admin' para ter permissão
 *    responses:
 *      201:
 *        description: Sala criada com sucesso
 *      403:
 *        description: Acesso proibido
 */
router.post(
  "/",
  checkRole(["admin"]), 
  regrasValidacaoSala, 
  verificarErros, 
  SalaController.criarSala
);

router.put("/:id", checkRole(["admin"]), regrasValidacaoSala, verificarErros, SalaController.atualizarSala);
router.delete("/:id", checkRole(["admin"]), SalaController.deletarSala);

export default router;