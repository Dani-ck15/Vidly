// Importa o express
const express = require("express");
const app = express();

// Porta do servidor (pode usar a variável de ambiente PORT ou 3000 como padrão)
const PORT = process.env.PORT || 3000;

// Rota inicial de teste
app.get("/", (req, res) => {
  res.send("Vidly backend funcionando 🚀");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
