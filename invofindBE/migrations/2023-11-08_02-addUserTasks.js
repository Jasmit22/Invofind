const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("employee_tasks", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "employees", key: "id" },
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "tasks", key: "id" },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("employee_tasks");
  },
};
