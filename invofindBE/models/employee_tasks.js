const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class EmployeeTasks extends Model {}

EmployeeTasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "employees", key: "id" },
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "tasks", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "employee_tasks",
  }
);

module.exports = EmployeeTasks;
