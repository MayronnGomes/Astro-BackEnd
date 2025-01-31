const db = require("../database");
const Atividade = db.Atividade;
const AçãoExtensão = db.AcaoExtensao;
const AtividadesUsuarios = db.AtividadesUsuario;
const Notificacoes = db.Notificacoes;
const Usuario = db.Usuario;
const AcaoExtensaoUsuario = db.AcaoExtensaoUsuario;
const HistoricoMensagens = db.HistoricoMensagens;
const { sendMailNotificationCriado, sendMailNotificationFinalizado, sendMailNotificationRetirado, sendMailNotificationDeletado } = require('../config/mailer')

module.exports = {

    get: {
        handler: async (req, res) => {

            try {

                const { id_user, id_acao } = req.params;

                const atividades = await AtividadesUsuarios.findAll({
                    where: { userId: id_user },
                    include: [{
                        model: Atividade,
                        as: 'atividade',
                        where: {
                            acaoExtensaoId: id_acao
                        }
                    }]
                });

                if (atividades.length > 0) {
                    const atividadesDetalhadas = [];

                    for (const atividadeUsuario of atividades) {
                        const atividade = atividadeUsuario.atividade;

                        const mensagens = await HistoricoMensagens.findAll({
                            where: { idAtividade: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome'],
                            }]
                        });

                        const msgs = mensagens.map(msg => ({
                            id: msg.id,
                            comentario: msg.comentario,
                            usuario: msg.usuario,
                            createdAt: msg.createdAt,
                        }));

                        const membrosAntigos = await AtividadesUsuarios.findAll({
                            where: { atividadeId: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const membros = await AcaoExtensaoUsuario.findAll({
                            where: { acaoExtensaoId: id_acao },
                            include: [{
                                model: Usuario,
                                as: 'usuarios',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const membrosantigos = membrosAntigos.map(membro => ({
                            id: membro.usuario.id,
                            nome: membro.usuario.nome,
                            email: membro.usuario.email,
                            tipoUsuario: membro.usuario.tipoUsuario,
                            status: membro.usuario.status
                        }));

                        const usuarios = membros.map(membro => membro.usuarios)
                        atividadesDetalhadas.push({
                            ...atividade.toJSON(),
                            msgs: msgs,
                            usuarios: usuarios,
                            membrosantigos: membrosantigos.map(membro => membro.id),
                        });
                    }
                    res.status(200).json({
                        atividades: atividadesDetalhadas
                    });
                } else {
                    res.status(200).json({
                        atividades: []
                    });
                }

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

    getRecentes: {
        handler: async (req, res) => {

            try {

                const { id_user } = req.params;

                const atividades = await AtividadesUsuarios.findAll({
                    where: { userId: id_user },
                    include: [{
                        model: Atividade,
                        as: 'atividade',
                        where: {
                            status: ['aberta', 'em andamento']
                        }
                    }],
                    limit: 4,
                    order: [[AtividadesUsuarios.sequelize.literal('atividade.createdAt'), 'DESC']]
                });

                if (atividades.length > 0) {
                    const atividadesDetalhadas = [];

                    for (const atividadeUsuario of atividades) {
                        const atividade = atividadeUsuario.atividade;

                        const mensagens = await HistoricoMensagens.findAll({
                            where: { idAtividade: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome'],
                            }]
                        });

                        const msgs = mensagens.map(msg => ({
                            id: msg.id,
                            comentario: msg.comentario,
                            usuario: msg.usuario,
                            createdAt: msg.createdAt,
                        }));

                        const membrosAntigos = await AtividadesUsuarios.findAll({
                            where: { atividadeId: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const membros = await AcaoExtensaoUsuario.findAll({
                            where: { acaoExtensaoId: atividade.acaoExtensaoId },
                            include: [{
                                model: Usuario,
                                as: 'usuarios',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const membrosantigos = membrosAntigos.map(membro => ({
                            id: membro.usuario.id,
                            nome: membro.usuario.nome,
                            email: membro.usuario.email,
                            tipoUsuario: membro.usuario.tipoUsuario,
                            status: membro.usuario.status
                        }));

                        const usuarios = membros.map(membro => membro.usuarios)
                        atividadesDetalhadas.push({
                            ...atividade.toJSON(),
                            msgs: msgs,
                            usuarios: usuarios,
                            membrosantigos: membrosantigos.map(membro => membro.id),
                        });
                    }
                    res.status(200).json({
                        atividades: atividadesDetalhadas
                    });
                } else {
                    res.status(200).json({
                        atividades: []
                    });
                }

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

    getAll: {
        handler: async (req, res) => {

            try {

                const { id_acao } = req.params;

                const atividades = await Atividade.findAll({
                    where: { acaoExtensaoId: id_acao },
                });

                if (atividades.length > 0) {
                    const atividadesComMembros = [];

                    for (const atividade of atividades) {
                        const membrosAntigos = await AtividadesUsuarios.findAll({
                            where: { atividadeId: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const membros = await AcaoExtensaoUsuario.findAll({
                            where: { acaoExtensaoId: id_acao },
                            include: [{
                                model: Usuario,
                                as: 'usuarios',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const mensagens = await HistoricoMensagens.findAll({
                            where: { idAtividade: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome'],
                            }]
                        });

                        const msgs = mensagens.map(msg => ({
                            id: msg.id,
                            comentario: msg.comentario,
                            usuario: msg.usuario,
                            createdAt: msg.createdAt,
                        }));

                        const usuarios = membros.map(membro => membro.usuarios)
                        atividadesComMembros.push({
                            ...atividade.toJSON(),
                            membrosantigos: membrosAntigos.map(membro => membro.userId),
                            usuarios: usuarios,
                            msgs: msgs,
                        });
                    }

                    res.status(200).json({
                        atividades: atividadesComMembros
                    });
                } else {
                    res.status(200).json({
                        atividades: []
                    });
                }

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

    getAllActivities: {
        handler: async (req, res) => {

            try {

                const { id_user } = req.params;

                const atividadesUsuarios = await AtividadesUsuarios.findAll({
                    where: { userId: id_user },
                    include: [{
                        model: Atividade,
                        as: 'atividade',
                    }]
                });

                if (atividadesUsuarios.length > 0) {
                    const atividadesComMembros = [];

                    for (const atividadeUsuario of atividadesUsuarios) {

                        const atividade = atividadeUsuario.atividade;

                        if (!atividade) continue;

                        const membrosAntigos = await AtividadesUsuarios.findAll({
                            where: { atividadeId: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const membros = await AcaoExtensaoUsuario.findAll({
                            where: { acaoExtensaoId: atividade.acaoExtensaoId },
                            include: [{
                                model: Usuario,
                                as: 'usuarios',
                                attributes: ['id', 'nome', 'email', 'tipoUsuario', 'status'],
                            }]
                        });

                        const mensagens = await HistoricoMensagens.findAll({
                            where: { idAtividade: atividade.id },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome'],
                            }]
                        });

                        const msgs = mensagens.map(msg => ({
                            id: msg.id,
                            comentario: msg.comentario,
                            usuario: msg.usuario,
                            createdAt: msg.createdAt,
                        }));

                        const usuarios = membros.map(membro => membro.usuarios)
                        atividadesComMembros.push({
                            ...atividade.toJSON(),
                            membrosantigos: membrosAntigos.map(membro => membro.userId),
                            usuarios: usuarios,
                            msgs: msgs,
                        });
                    }

                    res.status(200).json({
                        atividades: atividadesComMembros
                    });
                } else {
                    res.status(200).json({
                        atividades: []
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
                const { nome, descricao, tempoDuracao, dataInicio, dataFim, local, status, membros, acaoId, userSender } = req.body;

                if (!nome || !descricao || !tempoDuracao || !dataInicio || !dataFim || !local || !status || !acaoId || !membros) {
                    return res.status(400).json({ errors: [{ msg: 'Todos os campos são obrigatórios' }] });
                }

                const novaAtividade = await Atividade.create({
                    nome,
                    descricao,
                    tempoDuracao,
                    dataInicio,
                    dataFim,
                    local,
                    status,
                    acaoExtensaoId: acaoId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                const acaoExtensao = await AçãoExtensão.findByPk(acaoId);

                for (const membro of membros) {
                    await AtividadesUsuarios.create({
                        userId: membro,
                        atividadeId: novaAtividade.id,
                    });

                    await Notificacoes.create({
                        acaoExtensaoId: acaoId,
                        atividadeId: novaAtividade.id,
                        userId: membro,
                        tipo: 'criado',
                        status: 'não Lida',
                        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                    })

                    const user = await Usuario.findByPk(membro);
                    await sendMailNotificationCriado(user.email, novaAtividade, user.nome, acaoExtensao.nome, userSender);

                    if (['cancelada', 'encerrada com antecipação', 'encerrada com pendência', 'concluida'].includes(novaAtividade.status)) {

                        await Notificacoes.create({
                            acaoExtensaoId: acaoId,
                            atividadeId: novaAtividade.id,
                            userId: membro,
                            tipo: 'finalizado',
                            status: 'não Lida',
                            createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000 + 1000),
                            updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000 + 1000),
                        })

                        await sendMailNotificationFinalizado(user.email, novaAtividade.nome, user.nome, acaoExtensao.nome, userSender, novaAtividade.status);

                    }

                }

                res.status(201).json({
                    msg: 'Atividade criada com sucesso!',
                    atividade: novaAtividade,
                });
            } catch (error) {
                console.error("Erro ao criar atividade:", error);
                return res.status(500).json({ errors: [{ msg: 'Erro interno ao criar atividade' }] });
            }
        }

    },

    update: {
        handler: async (req, res) => {

            try {
                const { id, nome, descricao, tempoDuracao, dataInicio, dataFim, local, status, membros, id_acao, userSender } = req.body;
                if (!id || !nome || !descricao || !tempoDuracao || !dataInicio || !dataFim || !local || !status || !membros || !id_acao) {
                    return res.status(400).json({ errors: [{ msg: 'Todos os campos são obrigatórios' }] });
                }

                const updateAtividade = await Atividade.update(
                    {
                        nome,
                        descricao,
                        tempoDuracao,
                        dataInicio,
                        dataFim,
                        local,
                        status,
                    },
                    {
                        where: { id }
                    });

                const atividadeInfo = {
                    nome: nome,  
                    local: local, 
                    status: status,
                };

                const acaoExtensao = await AçãoExtensão.findByPk(id_acao);

                const membrosAntigos = await AtividadesUsuarios.findAll({
                    where: { atividadeId: id },
                    attributes: ['userId']
                });

                const membroAntigosDetalhado = membrosAntigos.map((membro) => membro.dataValues.userId)

                for (const membro of membros) {

                    if (!membroAntigosDetalhado.includes(membro)) {
                        console.log('new member', membro)
                        await AtividadesUsuarios.create({
                            userId: membro,
                            atividadeId: id,
                        });

                        await Notificacoes.create({
                            acaoExtensaoId: id_acao,
                            atividadeId: id,
                            userId: membro,
                            tipo: 'criado',
                            status: 'não Lida',
                            createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                            updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                        })

                        const user = await Usuario.findByPk(membro);
                        await sendMailNotificationCriado(user.email, atividadeInfo, nome, user.nome, acaoExtensao.nome, userSender);

                    }

                    if (['cancelada', 'encerrada com antecipação', 'encerrada com pendência', 'concluida'].includes(status)) {

                        await Notificacoes.create({
                            acaoExtensaoId: id_acao,
                            atividadeId: id,
                            userId: membro,
                            tipo: 'finalizado',
                            status: 'não Lida',
                            createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000 + 1000),
                            updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000 + 1000),
                        })

                        const user = await Usuario.findByPk(membro);
                        await sendMailNotificationFinalizado(user.email, nome, user.nome, acaoExtensao.nome, userSender, status);

                    }

                }

                for (const membro of membroAntigosDetalhado) {

                    if (!membros.includes(membro)) {
                        await AtividadesUsuarios.destroy({
                            where: { userId: membro }
                        })

                        await Notificacoes.create({
                            acaoExtensaoId: id_acao,
                            atividadeId: id,
                            userId: membro,
                            tipo: 'retirado',
                            status: 'não Lida',
                            createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                            updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                        })

                        const user = await Usuario.findByPk(membro);
                        await sendMailNotificationRetirado(user.email, nome, user.nome, acaoExtensao.nome, userSender);

                    }

                }

                res.status(201).json({
                    msg: 'Atividade atualizada com sucesso!',
                    atividade: updateAtividade,
                });
            } catch (error) {
                console.error("Erro ao atualizar atividade:", error);
                return res.status(500).json({ errors: [{ msg: 'Erro interno ao atualizar atividade' }] });
            }
        }

    },

    updateStatus: {
        handler: async (req, res) => {

            try {
                const prioridade = req.body.prioridade
                const id = req.params.id

                const resultado = await Atividade.update(
                    { prioridade: prioridade },
                    {
                        where: { id },
                    }
                );

                res.status(200).json({
                    msg: 'Status atualizado com Sucesso',
                });
            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro ao atualizar o Status' }] });
            }
        }
    },

    delete: {
        handler: async (req, res) => {

            try {

                const { id, acaoId, userSender } = req.body;

                const atividade = await Atividade.findByPk(id);

                const acaoExtensao = await AçãoExtensão.findByPk(acaoId);

                if (!atividade) {
                    return res.status(404).json({
                        errors: [{ msg: 'Atividade não encontrada' }]
                    });
                }

                const membros = await AtividadesUsuarios.findAll({
                    where: { atividadeId: id },
                    attributes: ['userId']
                });

                const membroDetalhados = membros.map((membro) => membro.dataValues.userId)

                await Atividade.update({
                    status: 'deletada'
                }, {
                    where: { id }
                })

                for (const membro of membroDetalhados) {

                    await Notificacoes.create({
                        acaoExtensaoId: acaoId,
                        atividadeId: id,
                        userId: membro,
                        tipo: 'deletado',
                        status: 'não Lida',
                        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                    })

                    const user = await Usuario.findByPk(membro);
                    await sendMailNotificationDeletado(user.email, atividade.nome, user.nome, acaoExtensao.nome, userSender);

                }

                res.status(200).json({
                    msg: 'Atividade deletada com sucesso!'
                });

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

}