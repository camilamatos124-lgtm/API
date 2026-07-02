import express from 'express';
import path from 'path'; // <--- Importe o path do Node.js
import salaRoutes from './routes/salaRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import { globalErrorHandler } from './middlewares/errorMiddleware.js';
import 'dotenv/config'; // Deve ser a primeira coisa a carregar!
import connectDB from './config/db.js'; // Ajuste o caminho se necessário
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// Conecta ao MongoDB antes de iniciar as rotas
connectDB();
const app = express();

// --- CONFIGURAÇÕES DO PUG E ARQUIVOS ESTÁTICOS ---
app.set('view engine', 'pug'); // Define o Pug como motor de telas
app.set('views', path.resolve('./src/views')); // Diz onde as telas vão ficar
app.use(express.static('public')); // Diz onde ficará o CSS e Imagens
// --------------------------------------------------

app.use(express.json());

// Rota para carregar a página inicial bonita do Pug
app.get('/', (req, res) => {
  res.render('index');
});

// Rota Visual para listar as salas usando o arquivo salas.pug

// Rota Visual para listar as salas usando o arquivo salas.pug
app.get('/salas', async (req, res, next) => {
  try {
    // Vamos consumir a sua própria API que já está funcionando!
    const response = await fetch('https://api-ir0g.onrender.com/api/salas');
    const salas = await response.json();
    
    // Renderiza o arquivo salas.pug enviando a lista
    res.render('salas', { salas });
  } catch (error) {
    console.error("Erro ao buscar salas da API:", error);
    res.render('salas', { salas: [] }); // Se der erro, mostra tela vazia em vez de quebrar
  }
});

// 2. Middlewares Globais (Logs, etc) - SEMPRE ANTES DAS ROTAS
const meuLog = (req, res, next) => {
  const data = new Date().toISOString();
  console.log(`[${data}] ${req.method} em ${req.url}`);
  next(); 
};
app.use(meuLog);

// 3. Definição das Rotas
// Altere a linha do seu app.use('/api-docs') para isso:
const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/themes/theme-monokai.css',
  customSiteTitle: "Rave Party API Docs"
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
app.use('/api/salas', salaRoutes);
app.use('/api/playlist', playlistRoutes);

// 4. MIDDLEWARE GLOBAL DE ERROS - SEMPRE DEPOIS DAS ROTAS!
// Se alguma rota fizer um "next(error)", cai direto aqui
app.use(globalErrorHandler);

export default app;