const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("locations", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        onDelete: "CASCADE",
      },
      type: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          len: [1, 60],
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
      onDelete: "CASCADE", // Add this line to enable cascading delete
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("items", "location_id"); // Remove the foreign key column first
    await queryInterface.dropTable("locations");
  },
};
