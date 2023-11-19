const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("employees", "admin", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("employees", "admin");
  },
};
