const db = require("../database");
const AcaoExtensao = db.AcaoExtensao;
const AcaoExtensaoUsuarios = db.AcaoExtensaoUsuario;

async function buscarFilhos(parentId) {
    const filhos = await AcaoExtensao.findAll({
        where: { parentId },
        attributes: ['id', 'nome', 'tipo', 'parentId', 'status'],
    });

    return Promise.all(
        filhos.map(async (filho) => ({
            ...filho.dataValues,
            filhos: await buscarFilhos(filho.id),
        }))
    );
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
                    
                            const filhos = await buscarFilhos(acao.id);
                    
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