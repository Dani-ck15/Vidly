// Importa o express
const express = require("express");
const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Usuários em memória (temporário)
let users = [];

// Rota inicial
app.get("/", (req, res) => {
  res.send("Vidly backend funcionando 🚀");
});

// Rota de status da API
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "Vidly API funcionando 🚀"
  });
});

// Rota de teste para usuários
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, nome: "Alice", email: "alice@vidly.com" },
    { id: 2, nome: "Bruno", email: "bruno@vidly.com" },
    { id: 3, nome: "Carla", email: "carla@vidly.com" }
  ]);
});

// Rota de registro
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const newUser = { username, password };
  users.push(newUser);

  res.json({ message: "Cadastro realizado com sucesso 🚀", user: newUser });
});

// Rota de login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({ message: "Login realizado com sucesso 🎉", user });
});

// Inicia o servidor (sempre no final)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
