import mongoose from "mongoose";

// Criando o Schema correto para a Playlist/Vídeos
const playlistSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  url: { type: String, required: true },
  // Esse campo conecta o vídeo com o ID da Sala lá no MongoDB
  salaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true }
}, { timestamps: true });

// Exportação segura que evita o erro de Overwrite
const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);

export default Playlist;