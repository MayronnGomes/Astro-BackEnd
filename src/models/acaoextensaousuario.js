'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcaoExtensaoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AcaoExtensaoUsuario.belongsTo(models.AcaoExtensao, {
        foreignKey: 'acaoExtensaoId', 
        as: 'acoes',  // Alias para a Atividade
      });

      // Associação de muitos para um com Usuario
      AcaoExtensaoUsuario.belongsTo(models.Usuario, {
        foreignKey: 'userId',
        as: 'usuarios',  // Alias para o Usuário
      });
    }
  }
  AcaoExtensaoUsuario.init({
    acaoExtensaoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'AcaoExtensao', 
        key: 'id',
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'AcaoExtensaoUsuario',
  });
  return AcaoExtensaoUsuario;
};