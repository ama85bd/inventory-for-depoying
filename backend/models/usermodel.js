// import pkg from 'sequelize';
// const { Sequelize,DataTypes,Op } = pkg;
// import {DataTypes} from 'sequelize/types'
import connection from "../connection.js";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";

const User = connection.sequelize.define(
  "User",
  {
    id: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    isSuperAdmin: {
      type: connection.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isAdmin: {
      type: connection.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    dept: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: connection.DataTypes.STRING(1234),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "User",
  }
);

const CreateTable = expressAsyncHandler(async (req, res) => {
  try {
    await User.sync({ force: true });
    console.log("Execute");
  } catch (error) {
    console.error("Fail!");
  }
});

const insertTable = expressAsyncHandler(async (req, res) => {
  try {
    await User.bulkCreate(data.users);
    console.log("Execute");
  } catch (error) {
    console.error("Fail!");
  }
});

// async function CreateTable(){
//     await User.sync({ force: true })
// }
// console.log(User === connection.sequelize.models.User2)
// CreateTable();
// CreateTableSt();
// insertTable()

export default User;
