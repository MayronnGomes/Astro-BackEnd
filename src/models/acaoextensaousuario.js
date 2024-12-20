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
      // define association here
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
        model: 'Usuario',
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