'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notificacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      acaoExtensaoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'AcaoExtensao',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      atividadeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Atividade',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      tipo: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Notificacoes');
  }
};