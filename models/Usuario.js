const { DataTypes } = require('sequelize');
const conn = require('../db/conn');

const Usuario = conn.define("Usuario", {
    nickname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Usuario;
