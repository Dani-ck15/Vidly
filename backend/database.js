// backend/database.js
const { Sequelize } = require("sequelize");

// Usando sql.js (banco em memória ou em arquivo)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // Banco só na memória (reinicia ao parar o servidor)
  logging: false,
});

module.exports = sequelize;
