const express = require('express');
const routes = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController');

routes.get('/', getAllUsers);
routes.post('/', createUser);

module.exports = routes;