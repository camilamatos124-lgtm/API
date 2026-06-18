import mongoose from "mongoose";

const salaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  capacidade: { type: Number, default: 100 },
  ativa: { type: Boolean, default: true }
}, { timestamps: true });

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);

export default Playlist;