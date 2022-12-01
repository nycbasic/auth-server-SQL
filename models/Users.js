const { DataTypes } = require("sequelize");
const db = require("../config/sequelize");

const User = db.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  google: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
