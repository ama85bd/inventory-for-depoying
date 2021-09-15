"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addram", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removeram", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addssd", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removessd", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addhdd", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removehdd", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addgraphics", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removegraphics", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),

      queryInterface.addColumn(
        "deviceProperties", // table name
        "adddisplay", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removedisplay", // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
