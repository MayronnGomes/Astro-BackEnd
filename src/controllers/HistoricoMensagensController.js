const db = require("../database");
const HistoricoMensagens = db.HistoricoMensagens;
const Usuario = db.Usuario;

module.exports = {

    create: {
            handler: async (req, res) => {
     
                try {
                    const { idUser, idAtividade, mensagem} = req.body;
    
                    const novaMensagem = await HistoricoMensagens.create({
                        idAtividade,
                        idUser,
                        comentario: mensagem,
                        createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                        updatedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                    });

                    const mensagemComUsuario = await HistoricoMensagens.findOne({
                        where: { id: novaMensagem.id },
                        attributes: { exclude: ['updatedAt'] },
                        include: [{
                            model: Usuario,
                            as: 'usuario',
                            attributes: ['id', 'nome'],
                        }],
                    });
    
                    res.status(201).json({
                        novaMensagem: mensagemComUsuario,
                        msg: 'Mensagem criada com sucesso!',
                    });
    
                } catch (error) {
                    console.error("Erro ao criar mensagem:", error);
                    return res.status(500).json({ errors: [{ msg: 'Erro interno ao cadastrar usuário' }] });
                }
            }
    
        },

}