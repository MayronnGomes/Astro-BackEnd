const db = require("../database");
const Notificacoes = db.Notificacoes;
const Atividade = db.Atividade;
const AcaoExtensao = db.AcaoExtensao;
const Usuario = db.Usuario;

module.exports = {

    get: {
        handler: async (req, res) => {

            try {

                const { id_user } = req.params;

                const notificacoes = await Notificacoes.findAll({
                    where: { userId: id_user },
                    include: [{
                        model: Atividade,
                        as: 'atividade',
                        attributes: ['nome', 'status'],
                    },
                    {
                        model: AcaoExtensao,
                        as: 'acaoExtensao',
                        attributes: ['nome', 'id_coordenador', 'tipo'],
                    },]
                });

                if (notificacoes.length > 0) {
                    const notificacoesDetalhadas = await Promise.all(notificacoes.map(async (notificacao) => {

                        const coordenador = await Usuario.findOne({
                            where: { id: notificacao.acaoExtensao.id_coordenador },
                            attributes: ['nome'],
                        });

                        return {
                            id: notificacao.id,
                            atividade: notificacao.atividade,
                            acaoExtensao: {
                                nome: notificacao.acaoExtensao.nome,
                                tipo: notificacao.acaoExtensao.tipo,
                                coordenador: coordenador.nome
                            },
                            tipo: notificacao.tipo,
                            status: notificacao.status,
                            createdAt: notificacao.createdAt,
                        };
                    }));


                    res.status(200).json({
                        notificacoes: notificacoesDetalhadas
                    });
                } else {
                    res.status(200).json({
                        notificacoes: []
                    });
                }

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

    updateStatus: {
        handler: async (req, res) => {

            try {
                const status = req.body.status;
                const id = req.params.id;

                const resultado = await Notificacoes.update(
                    { status: status },
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

                const { id } = req.params;

                const notificacao = await Notificacoes.findByPk(id);

                if (!notificacao) {
                    return res.status(404).json({
                        errors: [{ msg: 'Notificação não encontrado' }]
                    });
                }

                await Notificacoes.destroy({
                    where: { id }
                });

                res.status(200).json({
                    msg: 'Notificação excluída com sucesso!'
                });

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

}