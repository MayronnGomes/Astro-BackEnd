const db = require("../database");
const Atividade = db.Atividade;
const AtividadesUsuarios = db.AtividadesUsuario;

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
                    const atividadesDetalhadas = atividades.map(atividadeUsuario => atividadeUsuario.atividade);

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
                
                console.log('\naq', id_acao)
                const atividades = await Atividade.findAll({
                    where: { acaoExtensaoId: id_acao },
                });

                if (atividades.length > 0) {
                    res.status(200).json({
                        atividades: atividades
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
                const { nome, descricao, tempoDuracao, dataInicio, dataFim, local, status, membros, acaoId } = req.body;

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

                for (const membro of membros) {  
                    await AtividadesUsuarios.create({
                        userId: membro,
                        atividadeId: novaAtividade.id,
                    });
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
    }

}