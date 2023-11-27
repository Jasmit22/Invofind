const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deptName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "stores", key: "location" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "department",
  }
);

module.exports = Department;
