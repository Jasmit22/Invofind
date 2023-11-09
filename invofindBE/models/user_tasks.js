const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class UserTasks extends Model {}

UserTasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
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
    modelName: "user_tasks",
  }
);

module.exports = UserTasks;
