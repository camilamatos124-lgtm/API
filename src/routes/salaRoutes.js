import express from 'express';
import SalaController from '../controllers/salaController.js';
import { regrasValidacaoSala } from '../validators/salaValidator.js';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

// Importando os nossos 2 novos seguranças!
import authMiddleware from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/permissionsMiddleware.js';

const router = express.Router();

// ROTA GET: Abertas apenas para quem está LOGADO (authMiddleware)
router.get('/', authMiddleware, SalaController.listarSalas);
router.get('/view', SalaController.renderizarTelaSalas);
router.get('/:id', authMiddleware, SalaController.buscarSalaPorId);

// ROTA POST: Esteira de produção completa (Protegida para ADMINS)
router.post(
  '/',
  authMiddleware,         // 1: Tem Token?
  checkRole(['admin']),   // 2: É Admin?
  regrasValidacaoSala,    // 3: Aplica as regras de validação
  verificarErros,         // 4: Verifica se o corpo da requisição está ok
  SalaController.criarSala // 5: Chega no Controller
);

// ATUALIZAR: Protegida para ADMINS
router.put(
  '/:id', 
  authMiddleware,
  checkRole(['admin']),
  regrasValidacaoSala, 
  verificarErros, 
  SalaController.atualizarSala
);

// DELETAR: Protegida para ADMINS
router.delete('/:id', authMiddleware, checkRole(['admin']), SalaController.deletarSala);

export default router;