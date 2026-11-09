import { pool } from '../config/db.js';

const CATEGORIAS_SAIDA = ['Alimentação', 'Moradia', 'Saúde', 'Mobilidade', 'Lazer', 'Educação', 'Outros'];

export const Usuario = {
  async criarComPadroes({ nome, email, cpf, senhaHash }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows } = await client.query(
        `INSERT INTO usuarios (nome, email, cpf, senha_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, nome, email`,
        [nome, email, cpf, senhaHash]
      );
      const usuario = rows[0];

      await client.query(
        `INSERT INTO categorias (usuario_id, nome, tipo)
         VALUES ($1, 'Salário', 'entrada'), ($1, 'Outros', 'entrada')`,
        [usuario.id]
      );
      for (const nomeCat of CATEGORIAS_SAIDA) {
        await client.query(
          `INSERT INTO categorias (usuario_id, nome, tipo) VALUES ($1, $2, 'saida')`,
          [usuario.id, nomeCat]
        );
      }
      await client.query(
        `INSERT INTO fontes_destinos (usuario_id, nome, tipo)
         VALUES ($1, 'Conta corrente', 'conta'), ($1, 'Salário', 'renda')`,
        [usuario.id]
      );

      await client.query('COMMIT');
      return usuario;
    } catch (erro) {
      await client.query('ROLLBACK');
      throw erro;
    } finally {
      client.release();
    }
  },

  async buscarPorEmail(email) {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return rows[0];
  },

  async buscarPorId(id) {
    const { rows } = await pool.query('SELECT id, nome, email FROM usuarios WHERE id = $1', [id]);
    return rows[0];
  },
};