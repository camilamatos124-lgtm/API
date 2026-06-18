import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Rave Party",
      version: "1.0.0",
      description: "Documentação da API de Salas e Playlists com Swagger",
    },
    servers: [
      {
        url: "https://api-ir0g.onrender.com/api",
        description: "Servidor de Produção (Render)"
      }
    ]
  },
  // Aponta para as rotas onde estão os comentários que o Swagger vai ler
  apis: ["./src/routes/*.js"], 
};

// Gera a especificação final combinando as opções acima
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Exporta apenas o swaggerSpec (um único export padrão para o arquivo)
export default swaggerSpec;