const express = require('express');
const routes = express.Router();
const AuthController = require("./controllers/AuthController");

// Rotas de Autenticação
routes.post('/login', [AuthController.login.validations], AuthController.login.handler);

module.exports = routes;