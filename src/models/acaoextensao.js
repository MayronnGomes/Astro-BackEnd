'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcaoExtensao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento de uma Ação com suas subAções
      AcaoExtensao.hasMany(models.AcaoExtensao, {
        foreignKey: 'parentId',
        as: 'subAcoes'
      })
      
      // Relacionamento com a Ação Pai
      AcaoExtensao.belongsTo(models.AcaoExtensao, {
        foreignKey: 'parentId',
        as: 'acaoPai'
      })
      
      // Relacionamento muitos para muitos com Usuário através da tabela de junção
      AcaoExtensao.belongsToMany(models.Usuario, {
        through: models.AcaoExtensaoUsuario, 
        foreignKey: 'acaoExtensaoId', 
        as: 'membros',  
      });

      // Relacionamento um para muitos com Atividade
      AcaoExtensao.hasMany(models.Atividade, {
        foreignKey: 'acaoExtensaoId', 
        as: 'atividades', 
      });

    }
  }
  AcaoExtensao.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    tipo: DataTypes.STRING,
    status: DataTypes.STRING,
    id_coordenador: DataTypes.INTEGER,
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'AcaoExtensao',
    tableName: 'AcaoExtensao',
  });
  return AcaoExtensao;
};