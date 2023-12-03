const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("locations", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(60), // Change from TEXT to STRING with a maximum length of 60 characters
        allowNull: false,
        validate: {
          len: [1, 60], // Set the maximum length
        },
      },
      date: {
        type: DataTypes.DATE,
      },
      store_location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "stores", key: "location" },
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addColumn("items", "location_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "locations", key: "id" },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("locations");
  },
};
