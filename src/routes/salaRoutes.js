import express from 'express';
import SalaController from '../controllers/salaController.js';
import { regrasValidacaoSala } from '../validators/salaValidator.js';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

// Importando APENAS o segurança que você tem!
import { checkRole } from '../middlewares/permissionsMiddleware.js';

const router = express.Router();

// ROTA GET: Chamadas normais
router.get('/', SalaController.listarSalas);
router.get('/view', SalaController.renderizarTelaSalas);
router.get('/:id', SalaController.buscarSalaPorId);

// ROTA POST: Esteira de produção protegida com o seu checkRole
router.post(
  '/',
  checkRole(['admin']),   // Proteção RBAC
  regrasValidacaoSala,    // Validação dos dados
  verificarErros,         // Middleware que barra se tiver erro
  SalaController.criarSala
);

// ATUALIZAR: Protegida para ADMINS
router.put(
  '/:id', 
  checkRole(['admin']),
  regrasValidacaoSala, 
  verificarErros, 
  SalaController.atualizarSala
);

// DELETAR: Protegida para ADMINS
router.delete('/:id', checkRole(['admin']), SalaController.deletarSala);

export default router;