import SalaRepository from '../repositories/salaRepository.js';

class SalaService {
  static async listar() {
    return await SalaRepository.findAll();
  }

  static async buscarPorId(id) {
    const sala = await SalaRepository.findById(id);
    if (!sala) {
      const error = new Error('Sala não encontrada.');
      error.statusCode = 404;
      throw error;
    }
    return sala;
  }

  static async criar(dadosSala) {
    // Regra de negócio: Não deixar criar duas salas com o mesmo nome
    const salaExistente = await SalaRepository.findByNome(dadosSala.nome);
    if (salaExistente) {
      const error = new Error('Já existe uma sala com este nome.');
      error.statusCode = 409;
      throw error;
    }

    const novaSala = await SalaRepository.create(dadosSala);
    return novaSala;
  }

  static async atualizar(id, dados) {
    // Verifica se a sala existe antes de atualizar
    await this.buscarPorId(id); 

    const salaAtualizada = await SalaRepository.update(id, dados);
    return salaAtualizada;
  }

  static async deletar(id) {
    // Verifica se a sala existe antes de deletar
    await this.buscarPorId(id);

    await SalaRepository.delete(id);
  }
}

export default SalaService;