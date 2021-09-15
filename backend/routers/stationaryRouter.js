import express from "express";
import StaType from "../models/Stationary/stationaryTypeModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
const stationaryRouter = express.Router();

stationaryRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const allStationaryType = await StaType.findAll();
      res.send(allStationaryType);
    } catch (error) {
      res.status(401).send({ message: "Your are not admin" });
    }
  })
);

stationaryRouter.post(
  "/stationarytypecreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = new StaType({
      name: req.body.name,
      unit: req.body.unit,
    });
    const createstationarytype = await user.save();
    res.send({
      message: "Stationary Type Created",
      user: createstationarytype,
    });
  })
);

stationaryRouter.get("/:id", async (req, res) => {
  try {
    const oneStaType = await StaType.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.send(oneStaType);
  } catch (error) {
    res.status(404).send("Fail to get stationary type");
  }
});

stationaryRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const stationaryType = await StaType.findOne({
      where: { id: req.params.id },
    });
    if (stationaryType) {
      const deleteStationaryType = await stationaryType.destroy();
      res.send({ message: "User Stationary Type", user: deleteStationaryType });
    } else {
      res.status(404).send({ message: "Stationary Type Not Found" });
    }
  })
);

stationaryRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const stationaryType = await StaType.findOne({
      where: { id: req.params.id },
    });
    if (stationaryType) {
      stationaryType.name = req.body.name || stationaryType.name;
      stationaryType.unit = req.body.unit || stationaryType.unit;
      const updatedStationaryType = await stationaryType.save();
      res.send({
        message: "Stationary Type Updated",
        stationaryType: updatedStationaryType,
      });
    } else {
      res.status(404).send({ message: "Stationary Type Not Found" });
    }
  })
);

export default stationaryRouter;
