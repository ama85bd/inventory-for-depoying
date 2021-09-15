// import pkg from 'sequelize';
// const { Sequelize,DataTypes,Op } = pkg;
// import {DataTypes} from 'sequelize/types'
import connection from "../../connection.js";
import expressAsyncHandler from "express-async-handler";
import StaType from "./stationaryTypeModel.js";
import SourceType from "./sourceTypeModel.js";
// import data from "../data.js";

const stationaryPurchaseType = connection.sequelize.define(
  "stationaryPurchaseType",
  {
    id: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    purchaseDate: {
      type: connection.DataTypes.DATEONLY,
      allowNull: false,
    },
    EntryBy: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "stationaryPurchaseType",
  }
);
const CreateTable = expressAsyncHandler(async (req, res) => {
  try {
    stationaryPurchaseType.StaType = stationaryPurchaseType.belongsTo(StaType);
    stationaryPurchaseType.SourceType = stationaryPurchaseType.belongsTo(
      SourceType
    );
    await stationaryPurchaseType.sync({ alter: true });
    console.log("Execute stationaryPurchaseType");
  } catch (error) {
    console.error("Fail!");
  }
});

// const statinaryType = stationaryPurchaseType.belongsTo(StaType, {
//   as: "statinaryType",
// });
// const sourceName = stationaryPurchaseType.belongsTo(SourceType, {
//   as: "sourceName",
// });

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

export default stationaryPurchaseType;
