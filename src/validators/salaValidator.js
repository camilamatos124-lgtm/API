import { body } from 'express-validator';

export const regrasValidacaoSala = [
  body('nome')
    .trim()
    .notEmpty().withMessage('O nome da sala é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),
  
  body('status')
    .optional()
    .isIn(['ativa', 'pausada', 'manutenção']).withMessage('Status inválido. Use: ativa, pausada ou manutenção')
];