const db = require("../database");
const AcaoExtensao = db.AcaoExtensao;
const AcaoExtensaoUsuarios = db.AcaoExtensaoUsuario;

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
                    const acoesExtensaoDetalhadas = acoesExtensao.map(acaoExtensaoUsuarios => {
                        const acao = acaoExtensaoUsuarios.acoes;
                        return {
                            id: acao.id,
                            nome: acao.nome,
                            tipo: acao.tipo,
                            parentId: acao.parentId,
                            status: acao.status
                        };
                    });

                    res.status(200).json({
                        acoesExtensao: acoesExtensaoDetalhadas
                    });
                } else {
                    res.status(200).json({
                        acoesExtensao: []
                    });
                }

            } catch (error) {z
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

}