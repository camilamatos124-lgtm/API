import Playlist from '../models/playlistModel.js'; // Importa o modelo do Mongoose

class PlaylistRepository {
  // Buscar todas as playlists de uma sala específica
  static async findBySalaId(salaId) {
    return await Playlist.find({ salaId: salaId });
  }

  // Buscar playlist por ID
  static async findById(id) {
    return await Playlist.findById(id);
  }

  // Criar uma nova playlist vinculada a uma sala
  static async create(dadosPlaylist) {
    return await Playlist.create({
      nome: dadosPlaylist.nome,
      genero: dadosPlaylist.genero,
      musicas: dadosPlaylist.musicas || [],
      salaId: dadosPlaylist.salaId // O Mongoose já aceita o ObjectId diretamente
    });
  }

  // Deletar playlist por ID
  static async delete(id) {
    const resultado = await Playlist.findByIdAndDelete(id);
    return resultado ? true : false;
  }
}

export default PlaylistRepository;