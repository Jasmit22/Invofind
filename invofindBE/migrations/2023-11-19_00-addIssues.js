const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("issues", {
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
      date_resolved: {
        type: DataTypes.DATE,
      },
    });
    await queryInterface.addColumn("issues", "employee_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "employees", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("issues");
    await queryInterface.dropTable("employee_issues");
  },
};
