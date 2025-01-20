const express = require('express');
const routes = express.Router();
const AuthController = require("./controllers/AuthController");
const AtividadesController = require("./controllers/AtividadesController");
const UserController = require("./controllers/UserController")
const AcoesExtensaoController = require("./controllers/AcoesExtensaoController")

// Rotas de Autenticação
routes.post('/login', [AuthController.login.validations], AuthController.login.handler);
routes.post('/login-external', [AuthController.login_external.validations], AuthController.login_external.handler);

// Rotas Atividades
routes.get('/atividades/:id_user:id_acao', AtividadesController.get.handler);
routes.get('/atividadesCoord/:id_acao', AtividadesController.getAll.handler);
routes.post('/atividades', AtividadesController.create.handler)
routes.post('/atividadesStatus/:id', AtividadesController.updateStatus.handler)

// Rotas de Usuários
routes.post('/userCreate', UserController.create.handler)
routes.get('/membros/:id', UserController.getAll.handler);
routes.delete('/membros/:id:acaoId', UserController.delete.handler);

// Rotas de Ações de Extensão
routes.get('/acoesExtensao/:id_user', AcoesExtensaoController.get.handler);

module.exports = routes;