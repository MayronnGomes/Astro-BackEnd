'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AtividadesUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AtividadesUsuario.init({
    atividadeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Atividade', 
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
    }
  }, {
    sequelize,
    modelName: 'AtividadesUsuario',
  });
  return AtividadesUsuario;
};