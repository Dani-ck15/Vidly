# Vidly - Backend

Backend da aplicação **Vidly**, desenvolvido em **Node.js + Express**, com autenticação via **JWT** e persistência simples em arquivo JSON (`db.json`).

---

## 🚀 Como rodar

```bash
cd backend
npm install
node server.js

Servidor inicia em:

http://localhost:3000


---

🔑 Rotas principais

Status

GET /api/status → Verifica se o backend está rodando.


Usuários

GET /api/users → Lista todos os usuários (sem senha).

GET /api/users/:id → Busca usuário por ID.

POST /api/users → Cria novo usuário (nome, email, senha).

PUT /api/users/:id → Atualiza usuário (precisa do token JWT).

DELETE /api/users/:id → Remove usuário (precisa do token JWT).


Autenticação

POST /api/login → Faz login e retorna JWT.

GET /api/profile → Acessa perfil do usuário autenticado.



---

⚙️ Configuração

O backend usa a variável de ambiente:

JWT_SECRET

Caso não esteja definida, será usado o valor padrão "segredo123".


---

📂 Estrutura do projeto

backend/
├── db.js         # Manipulação de usuários no db.json
├── db.json       # "Banco de dados" local em JSON
├── server.js     # Servidor Express
├── package.json
└── README.md


---

🧪 Testes

Até o momento, só existem testes manuais via rotas.

Futuramente, podem ser criados testes automatizados (ex: Jest + Supertest).


