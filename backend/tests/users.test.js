const request = require("supertest");
const app = require("../server");

describe("Testes da API de Usuários", () => {
  it("GET /api/status deve responder com status ok", async () => {
    const res = await request(app).get("/api/status");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });

  it("POST /api/users deve criar um usuário novo", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        nome: "Teste",
        email: "teste@example.com",
        senha: "1234"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("nome", "Teste");
    expect(res.body).toHaveProperty("email", "teste@example.com");
    expect(res.body).not.toHaveProperty("senha");
  });

  it("POST /api/login deve autenticar usuário válido e retornar token", async () => {
    await request(app).post("/api/users").send({
      nome: "LoginTeste",
      email: "login@example.com",
      senha: "1234"
    });

    const res = await request(app).post("/api/login").send({
      email: "login@example.com",
      senha: "1234"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("PUT /api/users/:id deve atualizar o nome do usuário", async () => {
    // cria usuário
    const user = await request(app).post("/api/users").send({
      nome: "Atualizar",
      email: "atualizar@example.com",
      senha: "1234"
    });

    // login para pegar token
    const login = await request(app).post("/api/login").send({
      email: "atualizar@example.com",
      senha: "1234"
    });

    const token = login.body.token;

    // faz update
    const res = await request(app)
      .put(`/api/users/${user.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Atualizado" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nome", "Atualizado");
  });

  it("DELETE /api/users/:id deve deletar usuário", async () => {
    // cria usuário
    const user = await request(app).post("/api/users").send({
      nome: "Deletar",
      email: "delete@example.com",
      senha: "1234"
    });

    // login para pegar token
    const login = await request(app).post("/api/login").send({
      email: "delete@example.com",
      senha: "1234"
    });

    const token = login.body.token;

    // deleta usuário
    const res = await request(app)
      .delete(`/api/users/${user.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Usuário deletado com sucesso");
  });
});
