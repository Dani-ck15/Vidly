const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para entender JSON no corpo da requisição
app.use(express.json());

// Teste de status
app.get("/api/status", (req, res) => {
  res.json({ message: "Vidly backend funcionando 🚀" });
});

// Lista inicial de usuários (vamos manter em memória por enquanto)
let users = [
  { id: 1, name: "Ana", email: "ana@example.com" },
  { id: 2, name: "João", email: "joao@example.com" },
  { id: 3, name: "Maria", email: "maria@example.com" }
];

// READ: listar todos os usuários
app.get("/api/users", (req, res) => {
  res.json(users);
});

// READ: pegar usuário por ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(user);
});

// CREATE: adicionar novo usuário
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE: atualizar usuário por ID
app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE: remover usuário por ID
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

// Servidor rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
