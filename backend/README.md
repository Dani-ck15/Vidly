Este é o backend do projeto **Vidly**, rodando em Node.js + Express com persistência em arquivo JSON.

---

## 🚀 Deploy Online

O backend já está disponível em produção através do Render:  

👉 **Base URL da API:**

https://vidly-backend-ek8p.onrender.com

---

## 📌 Endpoints

### Status
```http
GET /api/status

Exemplo:
https://vidly-backend-ek8p.onrender.com/api/status


---

Usuários

Listar todos

GET /api/users

Buscar por ID

GET /api/users/:id

Criar usuário

POST /api/users
Content-Type: application/json

{
  "nome": "João",
  "email": "joao@example.com",
  "senha": "1234"
}

Login

POST /api/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "senha": "1234"
}

Retorna um token JWT para acessar rotas protegidas.

Perfil do usuário (rota protegida)

GET /api/profile
Authorization: Bearer <token>

Atualizar usuário

PUT /api/users/:id
Authorization: Bearer <token>

Deletar usuário

DELETE /api/users/:id
Authorization: Bearer <token>


---

📦 Rodando Localmente

# instalar dependências
npm install

# rodar servidor
npm start

O servidor rodará em:
http://localhost:3000


---

📝 Observações

No plano gratuito do Render, a aplicação pode "hibernar" após inatividade.

O primeiro acesso após um tempo parado pode levar alguns segundos para iniciar.
EOF
