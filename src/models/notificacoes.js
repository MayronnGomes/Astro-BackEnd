'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento com AcaoExtensao
      Notificacoes.belongsTo(models.AcaoExtensao, {
        foreignKey: 'acaoExtensaoId',
        as: 'acaoExtensao',
      });

      // Relacionamento com Atividades
      Notificacoes.belongsTo(models.Atividade, {
        foreignKey: 'atividadeId',
        as: 'atividade',
      });

      // Relacionamento com Usuario
      Notificacoes.belongsTo(models.Usuario, {
        foreignKey: 'userId',
        as: 'usuario',
      });
    }
  }
  Notificacoes.init({
    acaoExtensaoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AcaoExtensao',
        key: 'id',
      },
    },
    atividadeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Atividade',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
    },
    tipo: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notificacoes',
  });
  return Notificacoes;
};