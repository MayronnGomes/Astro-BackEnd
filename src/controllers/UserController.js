const User = require('../models/UserModel');

const getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
        res.status(200).json(results);
    });
};

const createUser = (req, res) => {
    const user = req.body;

    User.create(user, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    });
};

module.exports = { getAllUsers, createUser };