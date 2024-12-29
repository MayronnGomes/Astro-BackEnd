const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.listen(
    process.env.PORT,
    () => console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
)