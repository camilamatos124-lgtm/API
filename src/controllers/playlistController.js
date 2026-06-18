import PlaylistService from '../services/playlistService.js';

class PlaylistController {
  
  static async listarPlaylistPorSala(req, res, next) {
    try {
      const { salaId } = req.params;
      const videosDto = await PlaylistService.listarVideos(salaId);
      res.status(200).json(videosDto);
    } catch (error) {
      next(error); // Levanta a mão e passa o problema pra frente!
    }
  }

  static async adicionarVideo(req, res, next) {
    try {
      const novoVideoDto = await PlaylistService.adicionarVideo(req.body);
      res.status(201).json(novoVideoDto);
    } catch (error) {
      next(error); // Levanta a mão!
    }
  }

  static async removerVideo(req, res, next) {
    try {
      const { id } = req.params;
      await PlaylistService.removerVideo(id);
      res.status(204).send();
    } catch (error) {
      next(error); // Levanta a mão!
    }
  }
}

export default PlaylistController;