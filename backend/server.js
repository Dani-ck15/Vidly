// server.js - backend usando db.json (arquivo) + bcrypt + jwt
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "segredo-super-seguro";

// ---- rotas ----

// rota inicial
app.get("/", (req, res) => {
  res.send("Vidly backend (arquivo JSON) 🚀");
});

// status
app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "Vidly API funcionando 🚀" });
});

// listar usuários (não retorna senha)
app.get("/api/users", (req, res) => {
  const users = db.getUsers().map(u => ({ id: u.id, nome: u.nome, email: u.email }));
  res.json(users);
});

// buscar usuário por id
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = db.findUserById(id);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  const { senha, ...safe } = user;
  res.json(safe);
});

// criar usuário
app.post("/api/users", async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !nome.trim()) return res.status(400).json({ error: "Nome inválido" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) return res.status(400).json({ error: "Email inválido" });
  if (!senha || senha.length < 4) return res.status(400).json({ error: "Senha deve ter pelo menos 4 caracteres" });

  const exists = db.findUserByEmail(email);
  if (exists) return res.status(400).json({ error: "Email já cadastrado" });

  const hashed = await bcrypt.hash(senha, 10);
  const id = db.nextId();
  const newUser = { id, nome, email, senha: hashed };
  db.addUser(newUser);

  const { senha: _s, ...safe } = newUser;
  res.status(201).json(safe);
});

// login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: "Email e senha são obrigatórios" });

  const user = db.findUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const ok = await bcrypt.compare(senha, user.senha);
  if (!ok) return res.status(401).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
  const { senha: _s, ...safe } = user;
  res.json({ message: "Login bem-sucedido", token, user: safe });
});

// middleware para verificar JWT
function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ error: "Token não fornecido" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// rota de perfil
app.get("/api/profile", verifyToken, (req, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  const { senha, ...safe } = user;
  res.json({ ...safe, message: "Perfil acessado com sucesso" });
});

// atualizar usuário
app.put("/api/users/:id", verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id) return res.status(403).json({ error: "Você só pode atualizar o próprio perfil" });

  const { nome, email } = req.body;
  const updates = {};
  if (nome) updates.nome = nome;
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Email inválido" });
    const exists = db.findUserByEmail(email);
    if (exists && exists.id !== id) return res.status(400).json({ error: "Email já está em uso" });
    updates.email = email;
  }

  const updated = db.updateUser(id, updates);
  if (!updated) return res.status(404).json({ error: "Usuário não encontrado" });

  const { senha, ...safe } = updated;
  res.json(safe);
});

// deletar usuário
app.delete("/api/users/:id", verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id) return res.status(403).json({ error: "Você só pode deletar o próprio perfil" });

  const deleted = db.deleteUser(id);
  if (!deleted) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json({ message: "Usuário deletado com sucesso" });
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
