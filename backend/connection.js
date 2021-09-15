// import { Sequelize,DataTypes,Op } from "sequelize";
import pkg from "sequelize";
const { Sequelize, DataTypes, Op } = pkg;
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const {
  PORT,
  HOST,
  HOST_URL,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
  JWT_SECRET,
  SQL_PORT,
} = process.env;

const sequelize = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PASSWORD, {
  dialect: "mssql",
  host: SQL_SERVER,
  port: SQL_PORT,
});

const connection = {
  sequelize: sequelize,
  DataTypes: DataTypes,
  Op: Op,
};
export default connection;
