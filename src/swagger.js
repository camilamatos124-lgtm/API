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
        description: "Servidor do Render"
      }
    ]
  },
  apis: ["./src/routes/*.js"], // Caminho para encontrar seus comentários
};

export default swaggerOptions;