import Sala from '../models/salaModel.js'; // Importa o modelo que criamos ontem

class SalaRepository {
  // Buscar todas as salas
  static async findAll() {
    return await Sala.find();
  }

  // Buscar por ID (O MongoDB usa strings complexas chamadas ObjectId como ID)
  static async findById(id) {
    return await Sala.findById(id);
  }

  // Buscar por nome
  static async findByNome(nome) {
    return await Sala.findOne({ nome: nome });
  }

  // Criar uma nova sala
  static async create(dadosSala) {
    // O Mongoose já valida e salva direto no Atlas
    return await Sala.create({
      nome: dadosSala.nome,
      descricao: dadosSala.descricao,
      capacidade: dadosSala.capacidade,
      ativa: dadosSala.ativa !== undefined ? dadosSala.ativa : true
    });
  }

  // ATUALIZAR
  static async update(id, dadosAtualizados) {
    // { new: true } serve para o MongoDB retornar a sala já com os dados novos na resposta
    return await Sala.findByIdAndUpdate(id, dadosAtualizados, { new: true });
  }

  // DELETAR
  static async delete(id) {
    const resultado = await Sala.findByIdAndDelete(id);
    // Se encontrou e deletou, retorna true. Se não encontrou, retorna false.
    return resultado ? true : false;
  }
}

export default SalaRepository;