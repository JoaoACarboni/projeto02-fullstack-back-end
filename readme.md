# Projeto 02 Full Stack: Back-End

API REST do controle financeiro pessoal. O front-end está em [projeto02-fullstack-front-end](https://github.com/JoaoACarboni/projeto02-fullstack-front-end).

## Tecnologias utilizadas
- Node.js e Express
- PostgreSQL (driver `pg`, com pool de conexões)
- JWT (`jsonwebtoken`) e `bcrypt` para senhas
- `dotenv`, `cors` e `express-rate-limit`

## Pré-requisitos
- Node.js 18 ou superior
- PostgreSQL instalado, com o usuário `postgres` e a senha conhecida

## Como rodar do zero
1. Clone o repositório e instale as dependências:
   ```
   npm install
   ```
2. Copie `.env.example` para `.env` e preencha os valores (`DATABASE_URL`, `JWT_SECRET`).
3. Crie o banco e as tabelas:
   ```
   psql -U postgres -c "CREATE DATABASE financas;"
   psql -U postgres -d financas -f database/schema.sql
   ```
4. Suba a API:
   ```
   npm run dev
   ```
   A API fica em `http://localhost:3000`.

## Estrutura
```
database/   scripts SQL
src/
  server.js
  routes/       rotas e controladores
  models/       acesso ao banco
  middlewares/  autenticação, validação e erros
  config/       conexão com o banco e utilitários
```

## Rotas implementadas
| Método | Rota | Descrição |
|---|---|---|
| GET | /api/health | Testa a conexão com o banco |
| POST | /api/auth/cadastro | Cadastra usuário (cria categorias e fontes padrão) |
| POST | /api/auth/login | Autentica e devolve o JWT |
| GET | /api/auth/me | Dados do usuário logado (exige token) |

## Funcionalidades
- Cadastro com validação no servidor (e-mail, CPF com dígitos verificadores, senha), unicidade de e-mail e CPF garantida por UNIQUE no banco
- Login com JWT (1 hora de validade) e rate limiting
- Em desenvolvimento: categorias, fontes/destinos, lançamentos, relatórios e faturas

## Autores
João Antonio Carboni Gomes
Diogo Calegari dos Reis