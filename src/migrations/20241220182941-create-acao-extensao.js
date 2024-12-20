'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AcaoExtensao', {
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
      tipo: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      id_coordenador: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        }
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'AcaoExtensao', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',  
        onDelete: 'SET NULL', 
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
    await queryInterface.dropTable('AcaoExtensao');
  }
};