'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atividade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento com AcaoExtensao (um para muitos)
      Atividade.belongsTo(models.AcaoExtensao, {
        foreignKey: 'acaoExtensaoId', 
        as: 'acaoExtensao', 
      });

      // Relacionamento muitos para muitos com Usuario através da tabela de junção
      Atividade.belongsToMany(models.Usuario, {
        through: models.AtividadesUsuario, 
        foreignKey: 'atividadeId',  
        as: 'usuarios',  
      });

      // Relacionamento um para muitos com Notificações
      Atividade.hasMany(models.Notificacoes, {
        foreignKey: 'acaoExtensaoId',
        as: 'notificacoes',
      });
    }
  }
  Atividade.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    tempoDuracao: DataTypes.INTEGER,
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE,
    local: DataTypes.STRING,
    status: DataTypes.STRING,
    prioridade: DataTypes.STRING,
    acaoExtensaoId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'AcaoExtensao',  
        key: 'id',  
      },
    },
  }, {
    sequelize,
    modelName: 'Atividade',
    tableName: 'Atividade',
  });
  return Atividade;
};