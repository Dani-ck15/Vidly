// db.js - persistência simples usando um arquivo JSON
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'db.json');

function readDB() {
  try {
    const raw = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
}

function getUsers() {
  const db = readDB();
  return db.users || [];
}

function saveUsers(users) {
  writeDB({ users });
}

function nextId() {
  const users = getUsers();
  return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email === email);
}

function findUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === id);
}

function updateUser(id, updates) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  return users[index];
}

function deleteUser(id) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  const [deleted] = users.splice(index, 1);
  saveUsers(users);
  return deleted;
}

module.exports = {
  readDB,
  writeDB,
  getUsers,
  saveUsers,
  nextId,
  addUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser
};
