'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Atividade', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.TEXT
      },
      tempoDuracao: {
        type: Sequelize.INTEGER
      },
      dataInicio: {
        type: Sequelize.DATE
      },
      dataFim: {
        type: Sequelize.DATE
      },
      local: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      prioridade: {  
        type: Sequelize.STRING, 
        allowNull: true,
      },
      acaoExtensaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AcaoExtensao', 
          key: 'id', 
        },
        onDelete: 'CASCADE',  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Atividade');
  }
};