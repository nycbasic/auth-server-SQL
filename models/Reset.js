const { DataTypes } = require("sequelize");
const db = require("../config/sequelize");

const Reset = db.define("Reset", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetExpiration: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
});

module.exports = Reset;
