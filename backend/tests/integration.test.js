// backend/tests/integration.test.js
const request = require("supertest");
const assert = require("assert");
const app = require("../server");
const db = require("../db");

function cleanDB() {
  if (typeof db.writeDB === "function") {
    db.writeDB({ users: [] });
  } else {
    const fs = require("fs");
    const path = require("path");
    const FILE = path.join(__dirname, "..", "db.json");
    fs.writeFileSync(FILE, JSON.stringify({ users: [] }, null, 2), "utf8");
  }
}

async function run() {
  try {
    console.log("🔎 Limpando DB e iniciando testes...");
    cleanDB();

    // Criar usuário
    console.log("1) Criando usuário");
    const createRes = await request(app)
      .post("/api/users")
      .send({ nome: "Teste", email: "teste@example.com", senha: "123456" });
    assert.strictEqual(createRes.statusCode, 201);
    const userId = createRes.body.id;
    console.log("   ✅ usuário criado");

    // Login
    console.log("2) Fazendo login");
    const loginRes = await request(app)
      .post("/api/login")
      .send({ email: "teste@example.com", senha: "123456" });
    assert.strictEqual(loginRes.statusCode, 200);
    const token = loginRes.body.token;
    console.log("   ✅ login ok");

    // Profile
    console.log("3) Consultando profile");
    const profileRes = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(profileRes.statusCode, 200);
    console.log("   ✅ profile ok");

    // Listagem
    console.log("4) Listando usuários");
    const listRes = await request(app).get("/api/users");
    assert.strictEqual(listRes.statusCode, 200);
    console.log("   ✅ listagem ok");

    // Atualização
    console.log("5) Atualizando usuário");
    const updateRes = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Teste Atualizado" });
    assert.strictEqual(updateRes.statusCode, 200);
    console.log("   ✅ atualização ok");

    // Exclusão
    console.log("6) Deletando usuário");
    const delRes = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(delRes.statusCode, 200);
    console.log("   ✅ exclusão ok");

    console.log("🎉 Todos os testes passaram!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Falha:", err.message);
    process.exit(1);
  }
}

run();
