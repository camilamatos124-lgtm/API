export const globalErrorHandler = (error, req, res, next) => {
  // Log detalhado para o desenvolvedor ver no terminal
  console.error("ERRO DETECTADO:", error.message);
  console.error("Stack:", error.stack); // Mostra a linha exata do erro!

  // Define o status code (se o Service não mandou, vira 500)
  const statusCode = error.statusCode || 500;

  // Resposta padronizada para o Front-end
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: error.statusCode ? error.message : 'Ocorreu um erro interno no servidor.',
  });
};