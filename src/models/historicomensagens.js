'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoricoMensagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HistoricoMensagens.belongsTo(models.Atividade, {
        foreignKey: 'idAtividade', 
        as: 'atividade',  // Alias para a Atividade
      });

      // Associação de muitos para um com Usuario
      HistoricoMensagens.belongsTo(models.Usuario, {
        foreignKey: 'idUser',
        as: 'usuario',  // Alias para o Usuário
      });
    }
  }
  HistoricoMensagens.init({
    idAtividade: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Atividade',
        key: 'id',
      },
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
      allowNull: false,
    },
    comentario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HistoricoMensagens',
  });
  return HistoricoMensagens;
};