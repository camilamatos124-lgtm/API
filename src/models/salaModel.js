import mongoose from "mongoose";

const salaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  capacidade: { type: Number, default: 100 },
  ativa: { type: Boolean, default: true }
}, { timestamps: true });

const Sala = mongoose.models.Sala || mongoose.model('Sala', salaSchema);

export default Sala;