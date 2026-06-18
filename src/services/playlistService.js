import PlaylistRepository from '../repositories/playlistRepository.js';
import SalaRepository from '../repositories/salaRepository.js';
import { PlaylistResponseDTO } from '../dtos/playlistDTO.js';

class PlaylistService {
  static async adicionarVideo(dadosVideo) {
    // 1. Verifica se a sala existe no MongoDB
    const salaExiste = await SalaRepository.findById(dadosVideo.salaId);
    
    if (!salaExiste) {
      const error = new Error('Operação negada: A sala informada não existe.');
      error.statusCode = 404;
      throw error;
    }

    // 2. Cria no MongoDB
    const novoVideo = await PlaylistRepository.create(dadosVideo);

    // 3. Retorna usando o DTO
    return new PlaylistResponseDTO(novoVideo);
  }

  static async listarVideos(salaId) {
    // Busca todas as playlists/vídeos daquela sala específica no banco
    const videos = await PlaylistRepository.findBySalaId(salaId);
    
    // Mapeia para o formato DTO
    return videos.map(video => new PlaylistResponseDTO(video));
  }

  // ADICIONADO: Método para deletar, pois o Controller precisa dele!
  static async removerVideo(id) {
    // Verifica se existe antes de deletar
    const videoExiste = await PlaylistRepository.findById(id);
    
    if (!videoExiste) {
      const error = new Error('Vídeo/Playlist não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    await PlaylistRepository.delete(id);
  }
}

export default PlaylistService;