const db = require("../database");
const AcaoExtensao = db.AcaoExtensao;
const AcaoExtensaoUsuarios = db.AcaoExtensaoUsuario;

async function buscarFilhos(parentId, userId) {
    const filhos = await AcaoExtensao.findAll({
        where: { parentId },
        attributes: ['id', 'nome', 'tipo', 'parentId', 'status'],
    });

    const resultado = [];

    for (const filho of filhos) {
        const relacaoUsuario = await AcaoExtensaoUsuarios.findOne({
            where: {
                userId,
                acaoExtensaoId: filho.id,
            },
        });

        if (relacaoUsuario) {
            const netos = await buscarFilhos(filho.id, userId);

            resultado.push({
                ...filho.dataValues,
                filhos: netos,
            });
        } else {
            const netos = await AcaoExtensao.findAll({
                where: { parentId: filho.id },
                attributes: ['id', 'nome', 'tipo', 'parentId', 'status'],
            });

            const netosRelacionados = [];
            for (const neto of netos) {
                const relacaoNeto = await AcaoExtensaoUsuarios.findOne({
                    where: {
                        userId,
                        acaoExtensaoId: neto.id,
                    },
                });

                if (relacaoNeto) {
                    netosRelacionados.push({
                        ...neto.dataValues,
                    });
                }
            }

            if (netosRelacionados.length > 0) {
                netosRelacionados.map((neto) => {
                    resultado.push(neto);
                })
            }
        }
    }

    return resultado;
}

module.exports = {

    get: {
        handler: async (req, res) => {

            try {

                const { id_user } = req.params;

                const acoesExtensao = await AcaoExtensaoUsuarios.findAll({
                    where: { userId: id_user },
                    include: [{
                        model: AcaoExtensao,
                        as: 'acoes',
                    }]
                });

                if (acoesExtensao.length > 0) {
                    const acoesExtensaoDetalhadas = await Promise.all(
                        acoesExtensao.map(async (acaoExtensaoUsuarios) => {
                            const acao = acaoExtensaoUsuarios.acoes;

                            const filhos = await buscarFilhos(acao.id, id_user);

                            return {
                                id: acao.id,
                                nome: acao.nome,
                                tipo: acao.tipo,
                                parentId: acao.parentId,
                                status: acao.status,
                                filhos,
                            };
                        })
                    );

                    res.status(200).json({
                        acoesExtensao: acoesExtensaoDetalhadas
                    });
                } else {
                    res.status(200).json({
                        acoesExtensao: []
                    });
                }

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

}