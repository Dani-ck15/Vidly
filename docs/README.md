# Vidly

**Slogan:** Conectando criadores ao mundo 🌍  

O **Vidly** é uma aplicação que conecta criadores de conteúdo ao público, oferecendo uma plataforma segura e flexível.  
O projeto está em desenvolvimento e é dividido em **frontend** e **backend**.

---

## 📦 Estrutura do Projeto

vidly/ ├── backend/   # API e autenticação ├── frontend/  # Interface do usuário (ainda em desenvolvimento) ├── docs/      # Documentação do projeto └── README.md  # Este arquivo

---

## 🚀 Backend

O backend foi desenvolvido em **Node.js + Express**, usando **JWT** para autenticação e um **banco em arquivo JSON (`db.json`)** para persistência simples.

### Principais recursos
- Cadastro e login de usuários com **hash de senha**.  
- Autenticação via **JWT**.  
- CRUD de usuários protegido.  
- Rota de perfil autenticada.  
- API documentada no [backend/README.md](../backend/README.md).  

---

## 🛠️ Status Atual

- ✅ Backend funcional e testado (local).  
- ⚠️ Testes: apenas manuais até agora.  
- ⚠️ Documentação: atualizada apenas para backend.  
- ⚠️ Deploy: ainda não configurado (somente ambiente local).  
- ⏳ Frontend: em desenvolvimento.  

---

## 📌 Próximos Passos

1. Criar testes automatizados para o backend (ex: Jest + Supertest).  
2. Finalizar a documentação completa.  
3. Preparar o deploy do backend (Render/Heroku ou outro).  
4. Avançar no desenvolvimento do frontend.  

---

## 📚 Sobre

Este repositório está sendo desenvolvido de forma iterativa, com ajustes constantes.  
O objetivo é construir uma aplicação moderna, escalável e fácil de evoluir.
