const express = require('express');
const routes = express.Router();
const AuthController = require("./controllers/AuthController");
const AtividadesController = require("./controllers/AtividadesController");

// Rotas de Autenticação
routes.post('/login', [AuthController.login.validations], AuthController.login.handler);

// Rotas Atividades
routes.get('/atividades/:id_user', AtividadesController.get.handler);
routes.post('/atividades', AtividadesController.create.handler)
routes.post('/atividadesStatus/:id', AtividadesController.updateStatus.handler)

module.exports = routes;