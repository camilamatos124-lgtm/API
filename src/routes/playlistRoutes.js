import { Router } from 'express';
import PlaylistController from '../controllers/playlistController.js';
import { regrasValidacaoPlaylist } from '../validators/playlistValidator.js';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

// Importando apenas o checkRole
import { checkRole } from '../middlewares/permissionsMiddleware.js';

const router = Router();

// Listar vídeos
router.get('/sala/:salaId', PlaylistController.listarPlaylistPorSala);

// Adicionar vídeo: Somente ADMIN
router.post(
  '/', 
  checkRole(['admin']),        // Proteção RBAC
  regrasValidacaoPlaylist,     
  verificarErros,              
  PlaylistController.adicionarVideo 
);

// Remover vídeo: Somente ADMIN
router.delete('/:id', checkRole(['admin']), PlaylistController.removerVideo);

export default router;