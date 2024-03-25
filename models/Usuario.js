const conn = require("../db/conn");
const {DataTypes} = require ("sequelize");

const Usuario = conn.define("Usuario", {
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        require: true,
    },
});

module.esports = Usuario;