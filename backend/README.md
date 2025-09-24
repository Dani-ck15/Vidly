# Vidly Backend 🚀

Backend da aplicação **Vidly**, feito em **Node.js + Express**, com autenticação JWT, armazenamento simples em arquivo JSON (`db.json`) e testes automatizados.

---

## 📦 Requisitos

- Node.js 18+  
- NPM  
- (Opcional) Termux no Android  

---

## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/vidly.git
cd vidly/backend
npm install


---

▶️ Rodando localmente

npm start

O backend ficará disponível em:

http://localhost:3000


---

✅ Testes

Os testes usam supertest e jest.

Rodar todos os testes:

npm test


---

🌐 Deploy (Render)

O backend também está disponível online (pacote free do Render):

👉 https://vidly-backend-ek8p.onrender.com


---

🔑 Endpoints

Health check

GET /api/status

Retorna status da API.

Listar usuários

GET /api/users

Retorna lista de usuários (sem senhas).

Criar usuário

POST /api/users
Body: { "nome": "Ana", "email": "ana@email.com", "senha": "1234" }

Login

POST /api/login
Body: { "email": "ana@email.com", "senha": "1234" }

Retorna JWT para autenticação.

Perfil do usuário (rota protegida)

GET /api/profile
Headers: { "Authorization": "Bearer <token>" }

Atualizar usuário

PUT /api/users/:id
Headers: { "Authorization": "Bearer <token>" }
Body: { "nome": "Novo Nome" }

Deletar usuário

DELETE /api/users/:id
Headers: { "Authorization": "Bearer <token>" }


---

📖 Notas

Dados ficam salvos em db.json.

Senhas são hasheadas com bcrypt.

Autenticação feita com JWT.



---

📌 Próximos passos

Criar frontend (React/Next.js ou outra opção).

Melhorar cobertura de testes.

Documentação com Swagger/OpenAPI.
