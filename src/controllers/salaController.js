import SalaService from '../services/salaService.js';

class SalaController {
  
  static async listarSalas(req, res, next) {
    try {
      const salas = await SalaService.listar(); // Supondo que você criou isso no Service
      res.status(200).json(salas);
    } catch (error) {
      next(error); // Passa o erro para frente
    }
  }

  static async renderizarTelaSalas(req, res, next) {
    try {
      const salas = await SalaService.listar();
      res.render('salas', { salas: salas }); 
    } catch (error) {
      next(error);
    }
  }

  static async criarSala(req, res, next) {
    try {
      // 1. Pega os dados validados
      const dadosSala = req.body;

      // 2. Chama o Service (que vai retornar o DTO limpo)
      const novaSalaDto = await SalaService.criar(dadosSala);

      // 3. Responde HTTP 201 com o DTO
      res.status(201).json(novaSalaDto);
    } catch (error) {
      // 4. Se o Service der erro (ex: nome repetido), joga pro Global Error Handler
      next(error);
    }
  }

  static async buscarSalaPorId(req, res, next) {
    try {
      const { id } = req.params;
      const salaDto = await SalaService.buscarPorId(id);
      res.status(200).json(salaDto);
    } catch (error) {
      next(error);
    }
  }

  // ATUALIZAR (PUT)
  static async atualizarSala(req, res, next) {
    try {
      const { id } = req.params;
      const dados = req.body;
      const salaAtualizadaDto = await SalaService.atualizar(id, dados);
      
      res.status(200).json(salaAtualizadaDto);
    } catch (error) {
      next(error);
    }
  }

  // DELETAR (DELETE)
  static async deletarSala(req, res, next) {
    try {
      const { id } = req.params;
      await SalaService.deletar(id);
      
      // Status 204 significa "No Content" (Deu certo e não tem nada pra devolver)
      res.status(204).send(); 
    } catch (error) {
      next(error);
    }
  }
}

export default SalaController;