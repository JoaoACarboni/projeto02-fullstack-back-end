import { cpfValido, emailValido, senhaValida } from '../config/validacoes.js';

export function validarCadastro(req, res, next) {
  const { nome, email, cpf, senha } = req.body ?? {};
  const campos = {};

  if (!nome?.trim()) campos.nome = 'Informe o nome.';
  if (!emailValido(email ?? '')) campos.email = 'E-mail inválido.';
  if (!cpfValido(cpf ?? '')) campos.cpf = 'CPF inválido.';
  if (!senhaValida(senha)) campos.senha = 'A senha deve ter no mínimo 8 caracteres, com letras e números.';

  if (Object.keys(campos).length) {
    return res.status(400).json({ erro: 'Dados inválidos.', campos });
  }
  next();
}