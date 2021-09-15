// import pkg from 'sequelize';
// const { Sequelize,DataTypes,Op } = pkg;
// import {DataTypes} from 'sequelize/types'
import connection from "../../connection.js";
import expressAsyncHandler from "express-async-handler";
// import data from "../data.js";

const devicePurchase = connection.sequelize.define(
  "devicePurchase",
  {
    id: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    serial: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
    purchaseDate: {
      type: connection.DataTypes.DATEONLY,
      allowNull: false,
    },
    warranty: {
      type: connection.DataTypes.DATEONLY,
      allowNull: false,
    },
    EntryBy: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
    },
    assign: {
      type: connection.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "devicePurchase",
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

export default devicePurchase;
