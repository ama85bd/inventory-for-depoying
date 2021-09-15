import { sequelize } from "./connection.js";
// const connection = require('./connection.js')

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Execute");
  } catch (error) {
    console.error("Fail!");
  }
};

test();
