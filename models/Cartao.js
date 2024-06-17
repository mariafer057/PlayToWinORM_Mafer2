const db = require("../db/conn")
const { DataTypes } = require('sequelize');
const Usuario = require("../models/Usuario");

const Cartao = db.define("Cartão",{
    numero: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigoSeguranca: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
    tableName: "Cartoes",
    }
);
Cartao.belongsTo(Usuario);
Usuario.hasMany(Cartao);
module.exports = Cartao;
