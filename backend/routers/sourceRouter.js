import express from "express";
import SourceType from "../models/Stationary/sourceTypeModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
const sourceRouter = express.Router();

sourceRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const allSourceType = await SourceType.findAll();
      res.send(allSourceType);
    } catch (error) {
      res.status(401).send({ message: "Your are not admin" });
    }
  })
);

sourceRouter.post(
  "/sourcecreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const source = new SourceType({
      name: req.body.name,
    });
    const createSource = await source.save();
    res.send({
      message: "Stationary Type Created",
      source: createSource,
    });
  })
);

sourceRouter.get("/:id", async (req, res) => {
  try {
    const oneSource = await SourceType.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.send(oneSource);
  } catch (error) {
    res.status(404).send("Fail to get source");
  }
});

sourceRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const sourceType = await SourceType.findOne({
      where: { id: req.params.id },
    });
    if (sourceType) {
      const deleteSourceType = await sourceType.destroy();
      res.send({ message: "Source Type", user: deleteSourceType });
    } else {
      res.status(404).send({ message: "Source Not Found" });
    }
  })
);

sourceRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const sourceType = await SourceType.findOne({
      where: { id: req.params.id },
    });
    if (sourceType) {
      sourceType.name = req.body.name || sourceType.name;
      const updatedSourceType = await sourceType.save();
      res.send({
        message: "Source Updated",
        sourceType: updatedSourceType,
      });
    } else {
      res.status(404).send({ message: "Source Not Found" });
    }
  })
);

export default sourceRouter;
