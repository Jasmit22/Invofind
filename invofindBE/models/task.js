const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(60), // Change from TEXT to STRING with a maximum length of 60 characters
      allowNull: false,
      validate: {
        len: [1, 60], // Set the maximum length
      },
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "task",
  }
);

module.exports = Task;
