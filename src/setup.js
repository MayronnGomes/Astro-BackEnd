const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const { execSync } = require('child_process');
dotenv.config();

// Conectar ao MySQL sem especificar o banco de dados inicialmente
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function setupDatabase() {
  try {
    // Conectar ao MySQL sem banco de dados especificado (para verificar se o MySQL está acessível)
    await sequelize.authenticate();
    console.log('Conexão com o servidor MySQL bem-sucedida.');

    // Verificar se o banco de dados existe, caso contrário, criar
    const [results, metadata] = await sequelize.query("SHOW DATABASES LIKE 'astro'");
    if (results.length === 0) {
      await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    }

    // Agora conecte-se ao banco de dados recém-criado ou já existente
    sequelize.config.database = process.env.DB_NAME;
    await sequelize.authenticate();  // Reautenticar com o banco de dados correto

    // Rodar as migrations para criar as tabelas
    execSync('npx sequelize-cli db:migrate');
  } catch (error) {
    console.error('Erro durante a configuração do banco de dados:', error);
  } finally {
    // Fechar a conexão com o banco de dados
    await sequelize.close();
    console.log('Conexão com o banco de dados fechada.');
  }
}

setupDatabase();
