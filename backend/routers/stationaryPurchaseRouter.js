import express from "express";
import stationaryPurchaseType from "../models/Stationary/stationaryPurchaseTypeModel.js";
import StaType from "../models/Stationary/stationaryTypeModel.js";
import stationaryConsume from "../models/Stationary/stationaryComsumeModel.js";
import SourceType from "../models/Stationary/sourceTypeModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import connection from "../connection.js";
const stationaryPurchaseRouter = express.Router();

StaType.hasMany(stationaryConsume);
stationaryConsume.belongsTo(StaType);
StaType.hasMany(stationaryPurchaseType);
SourceType.hasMany(stationaryPurchaseType);
stationaryPurchaseType.belongsTo(StaType);
stationaryPurchaseType.belongsTo(SourceType);
// const allPurchase = async () =>
//   await connection.sequelize.sync({ force: true });
// allPurchase();
stationaryPurchaseRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const allPurchase = await stationaryPurchaseType.findAll();
      res.send(allPurchase);
    } catch (error) {
      res.status(401).send({ message: "Your are not admin" });
    }
  })
);

stationaryPurchaseRouter.post(
  "/purchasecreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchase = new stationaryPurchaseType({
      quantity: req.body.quantity,
      purchaseDate: req.body.purchaseDate,
      EntryBy: req.body.EntryBy,
      StaTypeId: req.body.StaTypeId,
      SourceTypeId: req.body.SourceTypeId,
    });
    const createpurchase = await purchase.save();
    res.send({
      message: "Purchase Created",
      purchase: createpurchase,
    });
  })
);

stationaryPurchaseRouter.get("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const onePurchase = await stationaryPurchaseType.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.send(onePurchase);
  } catch (error) {
    res.status(404).send("Fail to get purchase");
  }
});

stationaryPurchaseRouter.post("/find", async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await stationaryPurchaseType.count({
      include: [StaType, SourceType],
    });
    const onePurchase = await stationaryPurchaseType.findAll({
      include: [StaType, SourceType],
      offset: pageSize * (page - 1),
      limit: pageSize,
      order: [["createdAt", "DESC"]],
    });

    res.send({ onePurchase, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(404).send("Fail to get purchase");
  }
});

stationaryPurchaseRouter.post(
  "/find/:id",
  isAuth,
  isAdmin,
  async (req, res) => {
    try {
      const onepurchase = await stationaryPurchaseType.findOne({
        where: { id: req.params.id },
        include: [StaType, SourceType],
      });
      res.send(onepurchase);
    } catch (error) {
      res.status(404).send("Fail to get purchase");
    }
  }
);

stationaryPurchaseRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchase = await stationaryPurchaseType.findOne({
      where: { id: req.params.id },
    });
    if (purchase) {
      const deletePurchase = await purchase.destroy();
      res.send({ message: "Purchase", user: deletePurchase });
    } else {
      res.status(404).send({ message: "Purchase Not Found" });
    }
  })
);

stationaryPurchaseRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchase = await stationaryPurchaseType.findOne({
      where: { id: req.params.id },
    });
    if (purchase) {
      purchase.quantity = req.body.quantity || purchase.quantity;
      purchase.purchaseDate =
        req.body.purchaseDate || purchase.unpurchaseDateit;
      purchase.EntryBy = req.body.EntryBy || purchase.EntryBy;
      purchase.StaTypeId = req.body.StaTypeId || purchase.StaTypeId;
      purchase.SourceTypeId = req.body.SourceTypeId || purchase.SourceTypeId;
      const updatedPurchase = await purchase.save();
      res.send({
        message: "Purchase Updated",
        purchase: updatedPurchase,
      });
    } else {
      res.status(404).send({ message: "Purchase Not Found" });
    }
  })
);

stationaryPurchaseRouter.post(
  "/sum",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const allSumDetails = [];
    try {
      const allStationary = await StaType.findAll({
        attributes: [
          "id",
          "name",
          "unit",
          [
            connection.sequelize.fn(
              "sum",
              connection.sequelize.col("quantity")
            ),
            "total",
          ],
        ],

        include: [
          {
            model: stationaryPurchaseType,
            attributes: [],
          },
        ],

        group: ["StaType.id", "StaType.name", "StaType.unit"],
        raw: true,

        // order: connection.sequelize.literal("total DESC"),
      });

      // console.log(purchase);
      res.send(allStationary);
    } catch (error) {
      res.status(401).send({ message: "Not Found Sum" });
    }
  })
);

stationaryPurchaseRouter.post(
  "/sumcon",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const allSumDetails = [];
    try {
      const allStationary = await StaType.findAll({
        attributes: [
          "id",
          "name",
          "unit",
          [
            connection.sequelize.fn(
              "sum",
              connection.sequelize.col("quantity")
            ),
            "total",
          ],

          // [connection.sequelize.literal("(total - contotal)"), "finalsum"],
        ],

        include: [
          {
            model: stationaryPurchaseType,
            attributes: [],
          },
        ],

        group: ["StaType.id", "StaType.name", "StaType.unit"],
        raw: true,

        // order: connection.sequelize.literal("total DESC"),
      });

      const allConStationary = await StaType.findAll({
        attributes: [
          "id",
          "name",
          "unit",
          [
            connection.sequelize.fn(
              "sum",
              connection.sequelize.col("consumeQuantity")
            ),
            "total",
          ],
        ],

        include: [
          {
            model: stationaryConsume,
            attributes: [],
          },
        ],

        group: ["StaType.id", "StaType.name", "StaType.unit"],
        raw: true,

        // order: connection.sequelize.literal("total DESC"),
      });
      const arr = [];
      for (var i in allStationary) {
        for (var j in allConStationary) {
          if (allStationary[i].id == allConStationary[j].id) {
            var tot = allStationary[i].total - allConStationary[j].total;
            var ar = {
              id: allStationary[i].id,
              name: allStationary[i].name,
              unit: allStationary[i].unit,
              total: tot,
            };
            arr.push(ar);
          }
        }
      }

      // console.log(purchase);
      res.send(arr);
    } catch (error) {
      res.status(401).send({ message: "Not Found Con Sum" });
    }
  })
);
stationaryPurchaseRouter.post(
  "/sumcon/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const allSumDetails = [];
    try {
      const allStationary = await StaType.findAll({
        where: { id: req.params.id },
        attributes: [
          "id",
          "name",
          "unit",
          [
            connection.sequelize.fn(
              "sum",
              connection.sequelize.col("quantity")
            ),
            "total",
          ],

          // [connection.sequelize.literal("(total - contotal)"), "finalsum"],
        ],

        include: [
          {
            model: stationaryPurchaseType,
            attributes: [],
          },
        ],

        group: ["StaType.id", "StaType.name", "StaType.unit"],
        raw: true,

        // order: connection.sequelize.literal("total DESC"),
      });

      const allConStationary = await StaType.findAll({
        where: { id: req.params.id },
        attributes: [
          "id",
          "name",
          "unit",
          [
            connection.sequelize.fn(
              "sum",
              connection.sequelize.col("consumeQuantity")
            ),
            "total",
          ],
        ],

        include: [
          {
            model: stationaryConsume,
            attributes: [],
          },
        ],

        group: ["StaType.id", "StaType.name", "StaType.unit"],
        raw: true,

        // order: connection.sequelize.literal("total DESC"),
      });
      const arr = [];
      for (var i in allStationary) {
        for (var j in allConStationary) {
          if (allStationary[i].id == allConStationary[j].id) {
            var tot = allStationary[i].total - allConStationary[j].total;
            var ar = {
              id: allStationary[i].id,
              name: allStationary[i].name,
              unit: allStationary[i].unit,
              total: tot,
            };
            arr.push(ar);
          }
        }
      }

      // console.log(purchase);
      res.send(arr);
    } catch (error) {
      res.status(401).send({ message: "Not Found One Sta Type Con Sum" });
    }
  })
);

stationaryPurchaseRouter.post(
  "/sum/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const allSumDetails = [];
    try {
      const oneStationary = await StaType.findAll({
        where: { id: req.params.id },
        attributes: [
          "id",
          "name",
          "unit",
          [
            connection.sequelize.fn(
              "sum",
              connection.sequelize.col("quantity")
            ),
            "total",
          ],
        ],

        include: [
          {
            model: stationaryPurchaseType,
            attributes: [],
          },
        ],

        group: ["StaType.id", "StaType.name", "StaType.unit"],
        raw: true,

        // order: connection.sequelize.literal("total DESC"),
      });

      // console.log(purchase);
      res.send(oneStationary);
    } catch (error) {
      res.status(401).send({ message: "Not Found Sum" });
    }
  })
);

stationaryPurchaseRouter.post(
  "/assignstationary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const assign = new stationaryConsume({
      consumeQuantity: req.body.quantity,
      date: req.body.assignDate,
      issueBy: req.body.EntryBy,
      issueTo: req.body.assignUserId,
      StaTypeId: req.body.StaTypeId,
    });
    const assignsta = await assign.save();
    res.send({
      message: "Stationary Assigned",
      purchase: assignsta,
    });
  })
);

stationaryPurchaseRouter.get(
  "/con/:uid/:staId",
  isAuth,
  isAdmin,
  async (req, res) => {
    try {
      const onePurchase = await stationaryConsume.findAll({
        where: {
          issueTo: req.params.uid,
          StaTypeId: req.params.staId,
        },
        // where: {
        //   issueTo: req.params.uid,
        //   [connection.Op.or]: [
        //     // { issueTo: req.params.id },
        //     { StaTypeId: req.params.staId },
        //     { date: req.params.date },
        //   ],
        // },
        raw: true,
      });
      res.send(onePurchase);
    } catch (error) {
      res.status(404).send("Fail to get all stationary assign");
    }
  }
);

stationaryPurchaseRouter.get("/con/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const oneStaCon = await stationaryConsume.findOne({
      where: {
        id: req.params.id,
      },
      // where: {
      //   issueTo: req.params.uid,
      //   [connection.Op.or]: [
      //     // { issueTo: req.params.id },
      //     { StaTypeId: req.params.staId },
      //     { date: req.params.date },
      //   ],
      // },
      raw: true,
    });
    res.send(oneStaCon);
  } catch (error) {
    res.status(404).send("Fail to get one stationary assign");
  }
});

stationaryPurchaseRouter.put(
  "/con/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchaseCon = await stationaryConsume.findOne({
      where: { id: req.params.id },
    });
    if (purchaseCon) {
      purchaseCon.consumeQuantity =
        req.body.consumeQuantity || purchaseCon.consumeQuantity;
      const updatedPurchaseCon = await purchaseCon.save();
      res.send({
        message: "Purchase Consume Updated",
        purchaseCon: updatedPurchaseCon,
      });
    } else {
      res.status(404).send({ message: "Purchase Consume Not Found" });
    }
  })
);

stationaryPurchaseRouter.delete(
  "/con/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const stationaryCon = await stationaryConsume.findOne({
      where: { id: req.params.id },
    });
    if (stationaryCon) {
      const deleteStationaryCon = await stationaryCon.destroy();
      res.send({
        message: "Stationary Consume",
        stationaryCon: deleteStationaryCon,
      });
    } else {
      res.status(404).send({ message: "Stationary Consume Not Found" });
    }
  })
);
export default stationaryPurchaseRouter;
