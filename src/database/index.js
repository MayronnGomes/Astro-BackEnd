const Sequelize = require('sequelize');
const config = require('../config/db');  // Configuração do banco de dados
const connection = new Sequelize(config);

const db = {};

db.connection = connection;

db.AcaoExtensao = require('../models/acaoextensao')(connection, Sequelize.DataTypes);
db.AcaoExtensaoUsuario = require('../models/acaoextensaousuario')(connection, Sequelize.DataTypes);
db.Atividade = require('../models/atividade')(connection, Sequelize.DataTypes);
db.AtividadesUsuario = require('../models/atividadesusuario')(connection, Sequelize.DataTypes);
db.Usuario = require('../models/usuario')(connection, Sequelize.DataTypes);
db.Notificacoes = require('../models/notificacoes')(connection, Sequelize.DataTypes);

// Associando os modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = db;
