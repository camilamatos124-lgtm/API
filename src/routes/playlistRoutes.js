import { Router } from 'express';
import PlaylistController from '../controllers/playlistController.js';
import { regrasValidacaoPlaylist } from '../validators/playlistValidator.js';
import { verificarErros } from '../middlewares/validatorMiddleware.js';
import { checkRole } from '../middlewares/permissionsMiddleware.js';

const router = Router();

/**
 * @swagger
 * /playlists/sala/{salaId}:
 *  get:
 *    summary: Retorna a playlist de uma sala específica
 *    parameters:
 *      - in: path
 *        name: salaId
 *        required: true
 *        schema:
 *          type: string
 *          description: ID da sala para buscar os vídeos
 *    responses:
 *      200:
 *        description: Lista de vídeos da playlist retornada com sucesso
 */
router.get('/sala/:salaId', PlaylistController.listarPlaylistPorSala);

/**
 * @swagger
 * /playlists:
 *  post:
 *    summary: Adiciona um novo vídeo à playlist (Requer admin)
 *    parameters:
 *      - in: header
 *        name: role
 *        required: true
 *        schema:
 *          type: string
 *          description: Digite 'admin' para ter permissão
 *    responses:
 *      201:
 *        description: Vídeo adicionado com sucesso
 *      403:
 *        description: Acesso proibido
 */
router.post(
  '/', 
  checkRole(['admin']),        
  regrasValidacaoPlaylist,     
  verificarErros,              
  PlaylistController.adicionarVideo 
);

router.delete('/:id', checkRole(['admin']), PlaylistController.removerVideo);

export default router;