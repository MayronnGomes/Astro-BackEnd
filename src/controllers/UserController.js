const db = require("../database");
const bcrypt = require("bcryptjs");
const User = db.Usuario;
const AcaoExtensaoUsuario = db.AcaoExtensaoUsuario

module.exports = {

    get: {
        handler: async (req, res) => {

            try {

                const { id_user } = req.params;

                const atividades = await AtividadesUsuarios.findAll({
                    where: { userId: id_user },
                    include: [{
                        model: Atividade, 
                        as: 'atividade',
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

                const { id } = req.params;
                                
                const membros = await AcaoExtensaoUsuario.findAll({
                    where: { acaoExtensaoId: id },
                    include: [{
                        model: User, 
                        as: 'usuarios',
                        attributes: ['id', 'nome', 'email'],
                    }]
                });

                if (membros.length > 0) {

                    const membrosDetalhados = membros.map(membro => ({
                        id: membro.usuarios.id,     
                        nome: membro.usuarios.nome, 
                        email: membro.usuarios.email,
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
                const { nome, email, senha, cpf } = req.body;
                const acaoExtensaoId = 1 //pegar id da ação de extensão

                if (!nome || !email || !senha || !cpf || !acaoExtensaoId) {
                    return res.status(400).json({ errors: [{ msg: 'Todos os campos são obrigatórios' }] });
                }

                const novoUsuario = await User.create({
                    nome,
                    email,
                    user: cpf,
                    senha: bcrypt.hashSync(senha, 8),
                    tipoUsuario: "externo",
                    status: 1,
                    cpf,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                await AcaoExtensaoUsuario.create({
                    userId: novoUsuario.id,
                    acaoExtensaoId,
                });

                res.status(201).json({
                    msg: 'Usuário cadastrado com sucesso!',
                });
            } catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
                return res.status(500).json({ errors: [{ msg: 'Erro interno ao cadastrar usuário' }] });
            }
        }

    },

}