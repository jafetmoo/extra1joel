const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descuentoNavideño: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  comidaFavorita: {
    type: DataTypes.STRING,
  },
});

sequelize.sync(); // Sincroniza el modelo con la base de datos

module.exports = Cliente;
