import express from "express";
import connection from "./connection.js";
import expressAsyncHandler from "express-async-handler";
// const connection = require('./connection.js')
const testRouter = express.Router();
testRouter.get(
  "/test",
  expressAsyncHandler(async (req, res) => {
    try {
      await connection.sequelize.authenticate();
      res.send("Success");
      console.log("Execute");
    } catch (error) {
      console.error("Fail!!!");
      res.status(404).send("Fail status");
    }
  })
);
testRouter.post(
  "/post",
  expressAsyncHandler(async (req, res) => {
    try {
      await connection.sequelize.authenticate();
      res.send("Success post");
      console.log("Execute");
    } catch (error) {
      console.error("Fail1111!");
      res.status(404).send("Fail status");
    }
  })
);

export default testRouter;
