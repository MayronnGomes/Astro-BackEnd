'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('usuarios', [
      {
        id: 1,
        nome: 'Mayronn',
        email: 'aluno@example.com',
        user: '510006',
        senha: '$2a$08$iSSeKdg.D8BNBt//9FI7iuPXCWmd575feds1JUdfHOXOM1seAvi2u',
        tipoUsuario: 'aluno',
        status: 1,
        cpf: null,
        createdAt: new Date('2025-01-03 00:00:00'),
        updatedAt: new Date('2025-01-03 00:00:00'),
      },
      {
        id: 3,
        nome: 'Marina Azevedo',
        email: 'coordenadora@example.com',
        user: '0000001',
        senha: '$2a$08$.D8tydI6XLts2B4kZHPJke08xAxdkRBUDg7SvPf6E/o3DJmk93M5S',
        tipoUsuario: 'coordenador',
        status: 1,
        cpf: null,
        createdAt: new Date('2025-01-08 18:56:00'),
        updatedAt: new Date('2025-01-08 18:56:00'),
      },
    ]);

    await queryInterface.bulkInsert('acaoextensao', [
      {
        id: 1,
        nome: 'Nerds',
        descricao: 'Projeto de extensão',
        tipo: 'projeto',
        status: 'ativo',
        id_coordenador: 3,
        parentId: null,
        createdAt: new Date('2025-01-03 00:00:00'),
        updatedAt: new Date('2025-01-03 00:00:00'),
      },
      {
        id: 2,
        nome: 'Programa Nerds',
        descricao: 'Programa de extensão',
        tipo: 'programa',
        status: 'ativo',
        id_coordenador: 3,
        parentId: null,
        createdAt: new Date('2025-01-19 02:09:00'),
        updatedAt: new Date('2025-01-19 02:09:00'),
      },
      {
        id: 3,
        nome: 'Projeto Nerds',
        descricao: 'Projeto de extensão',
        tipo: 'projeto',
        status: 'ativo',
        id_coordenador: 3,
        parentId: 2,
        createdAt: new Date('2025-01-19 02:09:00'),
        updatedAt: new Date('2025-01-19 02:09:00'),
      },
      {
        id: 4,
        nome: 'Curso Nerds',
        descricao: 'Curso de arduíno',
        tipo: 'curso',
        status: 'ativo',
        id_coordenador: 3,
        parentId: 3,
        createdAt: new Date('2025-01-19 02:09:00'),
        updatedAt: new Date('2025-01-19 02:09:00'),
      },
    ]);

    await queryInterface.bulkInsert('acaoextensaousuarios', [
      {
        acaoExtensaoId: 1,
        userId: 1,
        createdAt: new Date('2025-01-03 00:00:00'),
        updatedAt: new Date('2025-01-03 00:00:00'),
      },
      {
        acaoExtensaoId: 2,
        userId: 1,
        createdAt: new Date('2025-01-19 02:09:00'),
        updatedAt: new Date('2025-01-19 02:09:00'),
      },
      {
        acaoExtensaoId: 1,
        userId: 3,
        createdAt: new Date('2025-01-20 12:11:00'),
        updatedAt: new Date('2025-01-20 12:11:00'),
      },
      {
        acaoExtensaoId: 2,
        userId: 3,
        createdAt: new Date('2025-01-20 12:11:00'),
        updatedAt: new Date('2025-01-20 12:11:00'),
      },
      {
        acaoExtensaoId: 3,
        userId: 3,
        createdAt: new Date('2025-01-20 12:11:00'),
        updatedAt: new Date('2025-01-20 12:11:00'),
      },
      {
        acaoExtensaoId: 4,
        userId: 3,
        createdAt: new Date('2025-01-20 12:11:00'),
        updatedAt: new Date('2025-01-20 12:11:00'),
      },
    ]);

    await queryInterface.bulkInsert('notificacoes', [
      {
        acaoExtensaoId: 1,
        atividadeId: null,
        userId: 1,
        tipo: 'adicionado',
        status: 'não Lida',
        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
      },
      {
        acaoExtensaoId: 2,
        atividadeId: null,
        userId: 1,
        tipo: 'adicionado',
        status: 'não Lida',
        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
      },
      {
        acaoExtensaoId: 1,
        atividadeId: null,
        userId: 3,
        tipo: 'adicionado',
        status: 'não Lida',
        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
      },
      {
        acaoExtensaoId: 2,
        atividadeId: null,
        userId: 3,
        tipo: 'adicionado',
        status: 'não Lida',
        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
      },
      {
        acaoExtensaoId: 3,
        atividadeId: null,
        userId: 3,
        tipo: 'adicionado',
        status: 'não Lida',
        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
      },
      {
        acaoExtensaoId: 4,
        atividadeId: null,
        userId: 3,
        tipo: 'adicionado',
        status: 'não Lida',
        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notificacoes', null, {});
    await queryInterface.bulkDelete('acaoextensaousuarios', null, {});
    await queryInterface.bulkDelete('acaoextensao', null, {});
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
