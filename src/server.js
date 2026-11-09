import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './config/db.js';
import { tratarErros } from './middlewares/erros.js';
import authRoutes from './routes/auth.routes.js';


const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use('/api/auth', authRoutes);

// Rota provisória só para testar a conexão com o banco
app.get('/api/health', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (erro) {
    next(erro);
  }
});

app.use(tratarErros);

app.listen(process.env.PORT, () => {
  console.log(`API em http://localhost:${process.env.PORT}`);
});