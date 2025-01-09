const express = require('express');
const routes = express.Router();
const AuthController = require("./controllers/AuthController");
const AtividadesController = require("./controllers/AtividadesController");
const UserController = require("./controllers/UserController")

// Rotas de Autenticação
routes.post('/login', [AuthController.login.validations], AuthController.login.handler);

// Rotas Atividades
routes.get('/atividades/:id_user', AtividadesController.get.handler);
routes.post('/atividades', AtividadesController.create.handler)
routes.post('/atividadesStatus/:id', AtividadesController.updateStatus.handler)

// Rotas de Usuários
routes.post('/userCreate', UserController.create.handler)
routes.get('/membros/:id', UserController.getAll.handler);
routes.delete('/membros/:id', UserController.delete.handler);

module.exports = routes;