require('dotenv').config()

module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialectOptions: {
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        },
    },
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: false
    }
}