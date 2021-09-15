"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addram", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removeram", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addssd", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removessd", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addhdd", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removehdd", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addgraphics", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removegraphics", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addkeyboard", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "0",
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removekeyboard", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "0",
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addmouse", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "0",
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removemouse", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "0",
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "addlan", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "0",
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removelan", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "0",
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
