import { Router } from 'express';
import PlaylistController from '../controllers/playlistController.js';
import { regrasValidacaoPlaylist } from '../validators/playlistValidator.js';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

// Importando os nossos 2 seguranças!
import authMiddleware from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/permissionsMiddleware.js';

const router = Router();

// Listar vídeos: Aberto para logados
router.get('/sala/:salaId', authMiddleware, PlaylistController.listarPlaylistPorSala);

// Adicionar vídeo: Somente ADMIN
router.post(
  '/', 
  authMiddleware,              // 1: Tem Token?
  checkRole(['admin']),        // 2: É Admin?
  regrasValidacaoPlaylist,     // 3: Aplica as regras
  verificarErros,              // 4: Barra se tiver erro de validação
  PlaylistController.adicionarVideo // 5: Chega na Classe do Controller
);

// Remover vídeo: Somente ADMIN
router.delete('/:id', authMiddleware, checkRole(['admin']), PlaylistController.removerVideo);

export default router;