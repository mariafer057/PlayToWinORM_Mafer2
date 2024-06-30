const db = require("../db/conn");
const { DataTypes } = require("sequelize");
const Jogo = require("../models/Jogo");

const Conquista = db.define(
  "Conquista",
  {
    nome: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  
);

Conquista.belongsTo(Jogo);
Jogo.hasMany(Conquista);

module.exports = Conquista;
