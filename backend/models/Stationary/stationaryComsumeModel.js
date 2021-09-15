import connection from "../../connection.js";
import expressAsyncHandler from "express-async-handler";
import stationaryPurchaseType from "./stationaryPurchaseTypeModel.js";

const stationaryConsume = connection.sequelize.define(
  "stationaryConsume",
  {
    id: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    consumeQuantity: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: connection.DataTypes.DATEONLY,
      allowNull: false,
    },
    issueBy: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
    },
    issueTo: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "stationaryConsume",
  }
);
const CreateTable = expressAsyncHandler(async (req, res) => {
  try {
    stationaryConsume.belongsTo(stationaryPurchaseType);
    await stationaryConsume.sync({ force: true });
    console.log("Execute stationaryConsume");
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

export default stationaryConsume;
