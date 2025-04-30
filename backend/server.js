/**
 * Arquivo principal do servidor backend.
 * Configura o Express, middlewares e rotas.
 * Realiza conexão com o banco PostgreSQL (Railway).
 * Expõe os endpoints da API e serve arquivos estáticos (como imagens).
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/products.js';
import db from './models/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(
  cors({
    origin: 'https://painel-produtos-vittorios-projects-eaa54a5f.vercel.app',
  }),
);
// Habilita CORS
// Permite leitura de JSON no body
app.use(express.json());

// Testa conexão com o banco de dados
db.connect()
  .then(() => console.log('Conectado ao banco de dados com sucesso!'))
  .catch((err) => console.error('Erro ao conectar no banco de dados:', err));

// Rotas
app.use('/api/products', productRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use('/uploads', express.static(path.resolve('uploads')));
