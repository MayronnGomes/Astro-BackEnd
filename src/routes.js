const express = require('express');
const routes = express.Router();
const AuthController = require("./controllers/AuthController");
const AtividadesController = require("./controllers/AtividadesController");
const UserController = require("./controllers/UserController")
const AcoesExtensaoController = require("./controllers/AcoesExtensaoController")
const NotificationsController = require("./controllers/NotificationsController");
const HistoricoMensagensController = require("./controllers/HistoricoMensagensController");

// Rotas de Autenticação
routes.post('/login', [AuthController.login.validations], AuthController.login.handler);
routes.post('/login-external', [AuthController.login_external.validations], AuthController.login_external.handler);

// Rotas Atividades
routes.get('/atividades/:id_user:id_acao', AtividadesController.get.handler);
routes.get('/atividadesCoord/:id_acao', AtividadesController.getAll.handler);
routes.get('/atividadesRecentes/:id_user', AtividadesController.getRecentes.handler);
routes.get('/atividadesTodas/:id_user', AtividadesController.getAllActivities.handler);
routes.post('/getAtividadeTime', AtividadesController.getTime.handler);
routes.post('/atividades', AtividadesController.create.handler)
routes.post('/atividadesStatus/:id', AtividadesController.updateStatus.handler)
routes.post('/atividadeUpdate', AtividadesController.update.handler)
routes.post('/atividadeTime', AtividadesController.updateTime.handler)
routes.delete('/atividade', AtividadesController.delete.handler);

// Rotas de Usuários
routes.get('/membros/:id', UserController.getAll.handler);
routes.post('/excluidoEm', UserController.checkTime.handler);
routes.post('/userCreate', UserController.create.handler)
routes.delete('/membros', UserController.delete.handler);

// Rotas de Ações de Extensão
routes.get('/acoesExtensao/:id_user', AcoesExtensaoController.get.handler);

// Rotas de Notificações
routes.get('/notifications/:id_user', NotificationsController.get.handler);
routes.post('/notificationsStatus/:id', NotificationsController.updateStatus.handler)
routes.delete('/notifications/:id', NotificationsController.delete.handler);

// Rotas de Histórico de Mensagens
routes.post('/mensagens', HistoricoMensagensController.create.handler)

module.exports = routes;