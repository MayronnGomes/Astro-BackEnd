'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento muitos para muitos com AcaoExtensao através da tabela de junção
      Usuario.belongsToMany(models.AcaoExtensao, {
        through: models.AcaoExtensaoUsuario, 
        foreignKey: 'userId',  
        as: 'acoesExtensao',  
      });

      // Relacionamento muitos para muitos com Atividade através da tabela de junção
      Usuario.belongsToMany(models.Atividade, {
        through: models.AtividadeUsuario, 
        foreignKey: 'usuarioId', 
        as: 'atividades', 
      });

    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    user: DataTypes.STRING,
    senha: DataTypes.STRING,
    tipoUsuario: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    cpf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};