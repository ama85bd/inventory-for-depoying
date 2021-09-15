// import pkg from 'sequelize';
// const { Sequelize,DataTypes,Op } = pkg;
// import {DataTypes} from 'sequelize/types'
import connection from "../../connection.js";
import expressAsyncHandler from "express-async-handler";
// import data from "../data.js";

const StaType = connection.sequelize.define(
  "StaType",
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
    unit: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "StationaryType",
  }
);
const CreateTable = expressAsyncHandler(async (req, res) => {
  try {
    await StaType.sync({ force: true });
    console.log("Execute StaType");
  } catch (error) {
    console.error("Fail!");
  }
});

// const insertTable = expressAsyncHandler(async (req, res) => {
//   try {
//     await StType.bulkCreate(data.users);
//     console.log("Execute");
//   } catch (error) {
//     console.error("Fail!");
//   }
// });

// async function CreateTable(){
//     await User.sync({ force: true })
// }
// console.log(User === connection.sequelize.models.User2)
// CreateTable();
// insertTable()

export default StaType;
