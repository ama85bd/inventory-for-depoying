import connection from "../../connection.js";
import expressAsyncHandler from "express-async-handler";

const deviceType = connection.sequelize.define(
  "deviceType",
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
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "deviceType",
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

export default deviceType;
