import { body } from 'express-validator';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

export const regrasValidacaoPlaylist = [
  // 1. Valida o ID da Sala (vínculo obrigatório)
  body('salaId')
    .notEmpty().withMessage('O campo salaId é obrigatório')
    .isInt().withMessage('O salaId deve ser um número inteiro'),

  // 2. Valida o Título do vídeo
  body('titulo')
    .trim()
    .notEmpty().withMessage('O título do vídeo é obrigatório')
    .isLength({ min: 2 }).withMessage('O título deve ter pelo menos 2 caracteres'),

  // 3. Valida a URL do vídeo
  body('url')
    .trim()
    .notEmpty().withMessage('A URL do vídeo é obrigatória')
    .isURL().withMessage('Insira uma URL válida (ex: https://youtube.com/...)'),

  // 4. Captura e retorna os erros se houverem
  verificarErros
];