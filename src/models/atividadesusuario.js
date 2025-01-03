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
      AtividadesUsuario.belongsTo(models.Atividade, {
        foreignKey: 'atividadeId', 
        as: 'atividade',  // Alias para a Atividade
      });

      // Associação de muitos para um com Usuario
      AtividadesUsuario.belongsTo(models.Usuario, {
        foreignKey: 'userId',
        as: 'usuario',  // Alias para o Usuário
      });
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