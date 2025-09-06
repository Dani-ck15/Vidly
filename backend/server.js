// backend/server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Rota de teste
app.get("/", (req, res) => {
  res.send("Vidly API está rodando 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
