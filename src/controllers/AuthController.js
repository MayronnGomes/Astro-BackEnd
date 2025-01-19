const { body, validationResult } = require('express-validator');
const db = require("../database");
const User = db.Usuario;
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const bcrypt = require("bcryptjs");

module.exports = {

    login: {
        validations: [
            body('user')
                .isLength({ min: 6, max: 7 }).withMessage('Matrícula/Siape precisa ter entre 6 e 7 caracteres')
                .not().isEmpty().withMessage('Matrícula ou Siape é obrigatório'),
            body('senha')
                .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres')
                .not().isEmpty().withMessage('Senha é obrigatória')
        ],
        handler: async (req, res) => {

            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const { user, senha } = req.body;

                const usuario = await User.findOne({
                    where: { user }
                });

                if (!usuario)
                    return res.status(404).json({ errors: [{ msg: "Credenciais inválidas" }] });

                let passwordIsValid = bcrypt.compareSync(senha, usuario.senha);

                if (!passwordIsValid)
                    return res.status(401).json({ errors: [{ msg: "Credenciais inválidas" }] });

                let token = jwt.sign({ id: user.id }, auth.secret, {
                    expiresIn: 86400
                });

                res.status(200).json({
                    message: 'Login bem-sucedido',
                    id: usuario.id,
                    nome: usuario.nome,
                    tipo: usuario.tipoUsuario,
                    token: token
                });


            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }

        }
    },

    login_external: {
        validations: [
            body('email')
                .isEmail().withMessage('E-mail inválido')
                .not().isEmpty().withMessage('E-mail é obrigatório'),
            body('senha')
                .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres')
                .not().isEmpty().withMessage('Senha é obrigatória')
        ],
        handler: async (req, res) => {

            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                let { email, senha } = req.body;

                const usuario = await User.findOne({
                    where: { user: email, tipoUsuario: "externo" }
                });

                if (!usuario)
                    return res.status(404).json({ errors: [{ msg: "Credenciais inválidas" }] });

                let passwordIsValid = bcrypt.compareSync(senha, usuario.senha);

                if (!passwordIsValid)
                    return res.status(401).json({ errors: [{ msg: "Credenciais inválidas" }] });

                let token = jwt.sign({ id: usuario.id }, auth.secret, {
                    expiresIn: 86400
                });

                res.status(200).json({
                    message: 'Login bem-sucedido',
                    id: usuario.id,
                    nome: usuario.nome,
                    tipo: usuario.tipoUsuario,
                    token: token
                });

            } catch (error) {
                return res.status(500).json({ errors: [{ msg: 'Erro interno do servidor' }] });
            }
        }
    }


};