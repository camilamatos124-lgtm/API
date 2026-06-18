import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Rave Party",
      version: "1.0.0",
      description: "Documentação da API de Salas e Playlists com Swagger "
    }
  },
  // Aqui avisamos onde estão os arquivos com as rotas para ele ler
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec; // [cite: 66]