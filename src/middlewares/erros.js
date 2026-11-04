export function tratarErros(erro, req, res, next) {
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
}