const { DataTypes } = require('sequelize');
const conn = require('../db/conn');

const Jogo = conn.define("Jogo", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Jogo;
