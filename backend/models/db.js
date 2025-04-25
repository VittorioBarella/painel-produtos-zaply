/**
 * Configuração da conexão com o banco de dados PostgreSQL usando Pool do pg.
 * Lê a URL de conexão do arquivo .env (DATABASE_URL) e habilita SSL para ambientes externos como Railway.
 */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default db;
