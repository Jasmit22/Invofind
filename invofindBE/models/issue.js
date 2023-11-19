const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Issue extends Model {}

Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100], // Set the maximum length
      },
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dateResolved: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "issue",
  }
);

module.exports = Issue;
