const db = require("../database");
const bcrypt = require("bcryptjs");
const atividade = require("../models/atividade");
const acaoextensaousuario = require("../models/acaoextensaousuario");
const User = db.Usuario;
const AcaoExtensao = db.AcaoExtensao;
const AcaoExtensaoUsuario = db.AcaoExtensaoUsuario;
const Notificacoes = db.Notificacoes;

module.exports = {

    getAll: {
        handler: async (req, res) => {

            try {

                const { id } = req.params;

                const membros = await AcaoExtensaoUsuario.findAll({
                    where: { acaoExtensaoId: id },
                    include: [{
                        model: User,
                        as: 'usuarios',
                        attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                    }]
                });

                if (membros.length > 0) {

                    const membrosDetalhados = membros.map(membro => ({
                        id: membro.usuarios.id,
                        nome: membro.usuarios.nome,
                        email: membro.usuarios.email,
                        tipoUsuario: membro.usuarios.tipoUsuario,
                        status: membro.usuarios.status,
                    }));

                    res.status(200).json({
                        membros: membrosDetalhados
                    });
                } else {
                    res.status(200).json({
                        membros: []
                    });
                }

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

    create: {
        handler: async (req, res) => {

            try {
                const { nome, email, senha, cpf, acaoId } = req.body;

                if (!nome || !email || !senha || !acaoId) {
                    return res.status(400).json({ errors: [{ msg: 'Os campos "Nome", "Email" e "Senha" são obrigatórios' }] });
                }

                const usuarioExists = await User.findOne({
                    where: { email }
                })

                if (usuarioExists) {

                    const usuarioInAcao = await AcaoExtensaoUsuario.findOne({
                        where: { userId: usuarioExists.id, acaoExtensaoId: acaoId }
                    })

                    if (usuarioInAcao) {
                        return res.status(400).json({ errors: [{ msg: 'Este usuário já está na ação!' }] });
                    }

                    await AcaoExtensaoUsuario.create({
                        userId: usuarioExists.id,
                        acaoExtensaoId: acaoId,
                    });

                    await Notificacoes.create({
                        acaoExtensaoId: acaoId,
                        atividadeId: null,
                        userId: usuarioExists.id,
                        tipo: 'adicionado',
                        status: 'não Lida',
                        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                    })

                    return res.status(200).json({ msg: 'Usuário adicionado a Ação com sucesso!' });
                }

                const novoUsuario = await User.create({
                    nome,
                    email,
                    user: email,
                    senha: bcrypt.hashSync(senha, 8),
                    tipoUsuario: "externo",
                    status: 1,
                    cpf,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                await AcaoExtensaoUsuario.create({
                    userId: novoUsuario.id,
                    acaoExtensaoId: acaoId,
                });

                await Notificacoes.create({
                    acaoExtensaoId: acaoId,
                    atividadeId: null,
                    userId: novoUsuario.id,
                    tipo: 'adicionado',
                    status: 'não Lida',
                    createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                    updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                })

                res.status(201).json({
                    msg: 'Usuário cadastrado com sucesso!',
                });

            } catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
                return res.status(500).json({ errors: [{ msg: 'Erro interno ao cadastrar usuário' }] });
            }
        }

    },

    delete: {
        handler: async (req, res) => {

            try {

                const { id, acaoId } = req.params;

                const user = await User.findByPk(id);

                if (!user) {
                    return res.status(404).json({
                        errors: [{ msg: 'Usuário não encontrado' }]
                    });
                }

                const acao = await AcaoExtensao.findByPk(acaoId);

                if (!acao) {
                    return res.status(404).json({
                        errors: [{ msg: 'Ação não encontrada' }]
                    });
                }

                const exist = await AcaoExtensaoUsuario.findOne({
                    where: { acaoExtensaoId: acaoId, userId: id }
                })

                if (!exist) {
                    return res.status(404).json({
                        errors: [{ msg: 'Usuário não está como Membro da Ação de extensão' }]
                    });
                }

                await AcaoExtensaoUsuario.destroy({
                    where: { acaoExtensaoId: acaoId, userId: id }
                });

                await Notificacoes.create({
                    acaoExtensaoId: acaoId,
                    atividadeId: null,
                    userId: id,
                    tipo: 'removido',
                    status: 'não Lida',
                    createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                    updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                })

                res.status(200).json({
                    msg: 'Usuário excluído com sucesso!'
                });

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },
}