import express from "express";
import SourceType from "../models/Stationary/sourceTypeModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import connection from "../connection.js";
import DeviceType from "../models/Device/deviceTypeModel.js";
import devicePurchase from "../models/Device/devicePurchaseModel.js";
import deviceProperties from "../models/Device/devicePropertiesModel.js";
import deviceConsume from "../models/Device/deviceComsumeModel.js";
import User from "../models/usermodel.js";
const deviceRouter = express.Router();

DeviceType.hasMany(devicePurchase);
devicePurchase.belongsTo(DeviceType);
DeviceType.hasMany(deviceProperties);
deviceProperties.belongsTo(DeviceType);
SourceType.hasMany(devicePurchase);
devicePurchase.belongsTo(SourceType);
devicePurchase.hasMany(deviceProperties);
deviceProperties.belongsTo(devicePurchase);
devicePurchase.hasMany(deviceConsume);
deviceConsume.belongsTo(devicePurchase);
User.hasMany(deviceConsume);
deviceConsume.belongsTo(User);

// const allDeviceModel = async () =>
//   await connection.sequelize.sync({ force: true });
// allDeviceModel();

deviceRouter.get(
  "/devicetype",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const allDeviceType = await DeviceType.findAll();
      res.send(allDeviceType);
    } catch (error) {
      res.status(401).send({ message: "Your are not admin" });
    }
  })
);

deviceRouter.post(
  "/devicetypecreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const devicetype = new DeviceType({
      name: req.body.name,
    });
    const createdevicetype = await devicetype.save();
    res.send({
      message: "Device Type Created",
      devicetype: createdevicetype,
    });
  })
);

deviceRouter.get("/devicetype/:id", async (req, res) => {
  try {
    const oneDeviceType = await DeviceType.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.send(oneDeviceType);
  } catch (error) {
    res.status(404).send("Fail to get device type");
  }
});

deviceRouter.put(
  "/devicetype/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deviceType = await DeviceType.findOne({
      where: { id: req.params.id },
    });
    if (deviceType) {
      deviceType.name = req.body.name || deviceType.name;
      const updatedDeviceType = await deviceType.save();
      res.send({
        message: "Device Type Updated",
        stationaryType: updatedDeviceType,
      });
    } else {
      res.status(404).send({ message: "Device Type Not Found" });
    }
  })
);

deviceRouter.delete(
  "/devicetype/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deviceType = await DeviceType.findOne({
      where: { id: req.params.id },
    });
    if (deviceType) {
      const deleteDeviceType = await deviceType.destroy();
      res.send({ message: "Device Type", user: deleteDeviceType });
    } else {
      res.status(404).send({ message: "Device Type Not Found" });
    }
  })
);

deviceRouter.post("/", async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await devicePurchase.count({
      include: [DeviceType, SourceType],
    });
    const onePurchase = await devicePurchase.findAll({
      include: [DeviceType, SourceType],
      offset: pageSize * (page - 1),
      limit: pageSize,
      order: [["createdAt", "DESC"]],
    });

    res.send({ onePurchase, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(404).send("Fail to get device purchase");
  }
});

deviceRouter.post(
  "/devicepurchasecreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchase = new devicePurchase({
      serial: req.body.serial,
      brand: req.body.brand,
      purchaseDate: req.body.purchaseDate,
      warranty: req.body.warranty,
      EntryBy: req.body.EntryBy,
      deviceTypeId: req.body.deviceTypeId,
      SourceTypeId: req.body.SourceTypeId,
    });
    const createpurchase = await purchase.save();
    res.send({
      message: "Device Purchase Created",
      purchase: createpurchase,
    });
  })
);

deviceRouter.get("/brand", isAuth, isAdmin, async (req, res) => {
  try {
    const brands = await devicePurchase.findAll({
      attributes: [
        [
          connection.sequelize.fn(
            "DISTINCT",
            connection.sequelize.col("brand")
          ),
          "brand",
        ],
      ],
    });
    res.send(brands);
  } catch (error) {
    res.status(404).send("Fail to get device brand");
  }
});

deviceRouter.post("/pur/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const onepurchase = await devicePurchase.findOne({
      where: { id: req.params.id },
      include: [DeviceType, SourceType],
    });
    res.send(onepurchase);
  } catch (error) {
    res.status(404).send("Fail to get device purchase");
  }
});

deviceRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchase = await devicePurchase.findOne({
      where: { id: req.params.id },
    });
    if (purchase) {
      purchase.serial = req.body.serial || purchase.serial;
      purchase.brand = req.body.brand || purchase.brand;
      purchase.purchaseDate = req.body.purchaseDate || purchase.purchaseDate;
      purchase.warranty = req.body.warranty || purchase.warranty;
      purchase.EntryBy = req.body.EntryBy || purchase.EntryBy;
      purchase.deviceTypeId = req.body.deviceTypeId || purchase.deviceTypeId;
      purchase.SourceTypeId = req.body.SourceTypeId || purchase.SourceTypeId;
      purchase.assign = Boolean(req.body.assign);
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

deviceRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchase = await devicePurchase.findOne({
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

deviceRouter.post("/pro", async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await deviceProperties.count({
      include: [{ model: devicePurchase, include: [DeviceType] }],
    });
    const oneProperties = await deviceProperties.findAll({
      include: [{ model: devicePurchase, include: [DeviceType] }],
      offset: pageSize * (page - 1),
      limit: pageSize,
      order: [["createdAt", "DESC"]],
    });

    res.send({ oneProperties, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(404).send("Fail to get properties");
  }
});

deviceRouter.post(
  "/deviceprocreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const properties = new deviceProperties({
      cpu: req.body.cpu,
      cpuspeed: req.body.cpuspeed,
      ram: req.body.ram,
      graphics: req.body.graphics,
      ssd: req.body.ssd,
      hdd: req.body.hdd,
      display: req.body.display,
      keyboard: req.body.keyboard,
      mouse: req.body.mouse,
      os: req.body.os,
      EntryBy: req.body.EntryBy,
      devicePurchaseId: req.body.devicePurchaseId,
      deviceTypeId: req.body.deviceTypeId,
    });
    const createproperties = await properties.save();
    res.send({
      message: "Device Properties Created",
      properties: createproperties,
    });
  })
);

deviceRouter.post("/serial/:id", async (req, res) => {
  try {
    const onepurchase = await devicePurchase.findAll({
      where: { deviceTypeId: req.params.id },
      // include: [DeviceType, SourceType],
    });
    res.send(onepurchase);
  } catch (error) {
    res.status(404).send("Fail to get device serial");
  }
});

deviceRouter.post("/serialwithoutassign/:id", async (req, res) => {
  try {
    const onepurchase = await devicePurchase.findAll({
      where: { deviceTypeId: req.params.id, assign: false },
      // include: [DeviceType, SourceType],
    });
    res.send(onepurchase);
  } catch (error) {
    res.status(404).send("Fail to get device serial");
  }
});

deviceRouter.post("/pro/:id", async (req, res) => {
  try {
    const onePropertiesDetails = await deviceProperties.findOne({
      where: { id: req.params.id },
      include: [{ model: devicePurchase, include: [DeviceType] }],
    });

    res.send(onePropertiesDetails);
  } catch (error) {
    res.status(404).send("Fail to get properties");
  }
});

deviceRouter.put(
  "/pro/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const properties = await deviceProperties.findOne({
      where: { id: req.params.id },
    });
    if (properties) {
      properties.cpu = req.body.cpu || properties.cpu;
      properties.cpuspeed = req.body.cpuspeed || properties.cpuspeed;
      properties.ram = req.body.ram || properties.ram;
      properties.graphics = req.body.graphics || properties.graphics;
      properties.ssd = req.body.ssd || properties.ssd;
      properties.hdd = req.body.hdd || properties.hdd;
      properties.display = req.body.display || properties.display;
      properties.keyboard = req.body.keyboard || properties.keyboard;
      properties.mouse = req.body.mouse || properties.mouse;
      properties.os = req.body.os || properties.os;
      properties.EntryBy = req.body.EntryBy || properties.EntryBy;
      properties.devicePurchaseId =
        req.body.devicePurchaseId || properties.devicePurchaseId;
      const updatedProperties = await properties.save();
      res.send({
        message: "Properties Updated",
        purchase: updatedProperties,
      });
    } else {
      res.status(404).send({ message: "Properties Not Found" });
    }
  })
);

deviceRouter.post(
  "/proadd/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const properties = await deviceProperties.findOne({
      where: { id: req.params.id },
    });
    if (properties) {
      properties.cpu = req.body.cpu || properties.cpu;
      properties.cpuspeed = req.body.cpuspeed || properties.cpuspeed;
      properties.ram = req.body.nram || properties.ram;
      properties.addram = req.body.addram
        ? Number(req.body.addram) + Number(properties.addram)
        : properties.addram;
      properties.removeram = req.body.removeram
        ? Number(req.body.removeram) + Number(properties.removeram)
        : properties.removeram;
      properties.graphics = req.body.ngraphics || properties.graphics;
      properties.addgraphics = req.body.addgraphics
        ? Number(req.body.addgraphics) + Number(properties.addgraphics)
        : properties.addgraphics;
      properties.removegraphics = req.body.removegraphics
        ? Number(req.body.removegraphics) + Number(properties.removegraphics)
        : properties.removegraphics;
      properties.ssd = req.body.nssd || properties.ssd;
      properties.addssd = req.body.addssd
        ? Number(req.body.addssd) + Number(properties.addssd)
        : properties.addssd;
      properties.removessd = req.body.removessd
        ? Number(req.body.removessd) + Number(properties.removessd)
        : properties.removessd;
      properties.hdd = req.body.nhdd || properties.hdd;
      properties.addhdd = req.body.addhdd
        ? Number(req.body.addhdd) + Number(properties.addhdd)
        : properties.addhdd;
      properties.removehdd = req.body.removehdd
        ? Number(req.body.removehdd) + Number(properties.removehdd)
        : properties.removehdd;
      properties.removedisplay = properties.display;
      properties.display = req.body.adddisplay || properties.display;
      properties.adddisplay = req.body.adddisplay || properties.adddisplay;
      properties.removekeyboard = properties.keyboard;
      properties.keyboard = req.body.addkeyboard || properties.keyboard;
      properties.addkeyboard = req.body.addkeyboard || properties.addkeyboard;
      properties.removemouse = properties.mouse;
      properties.mouse = req.body.addmouse || properties.mouse;
      properties.addmouse = req.body.addmouse || properties.addmouse;
      properties.addlan = req.body.addlan || properties.addlan;
      properties.removelan = req.body.removelan || properties.removelan;
      properties.os = req.body.os || properties.os;
      properties.EntryBy = req.body.EntryBy || properties.EntryBy;
      properties.devicePurchaseId =
        req.body.devicePurchaseId || properties.devicePurchaseId;
      const updatedProperties = await properties.save();
      res.send({
        message: "Properties Updated",
        purchase: updatedProperties,
      });
    } else {
      res.status(404).send({ message: "Properties Not Found" });
    }
  })
);
deviceRouter.post(
  "/proremove/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const properties = await deviceProperties.findOne({
      where: { id: req.params.id },
    });
    if (properties) {
      properties.cpu = req.body.cpu || properties.cpu;
      properties.cpuspeed = req.body.cpuspeed || properties.cpuspeed;
      properties.ram = req.body.nram || properties.ram;
      properties.addram = req.body.addram
        ? Number(req.body.addram) + Number(properties.addram)
        : properties.addram;
      properties.removeram = req.body.removeram
        ? Number(req.body.removeram) + Number(properties.removeram)
        : properties.removeram;
      properties.graphics = req.body.ngraphics || properties.graphics;
      properties.addgraphics = req.body.addgraphics
        ? Number(req.body.addgraphics) + Number(properties.addgraphics)
        : properties.addgraphics;
      properties.removegraphics = req.body.removegraphics
        ? Number(req.body.removegraphics) + Number(properties.removegraphics)
        : properties.removegraphics;
      properties.ssd = req.body.nssd || properties.ssd;
      properties.addssd = req.body.addssd
        ? Number(req.body.addssd) + Number(properties.addssd)
        : properties.addssd;
      properties.removessd = req.body.removessd
        ? Number(req.body.removessd) + Number(properties.removessd)
        : properties.removessd;
      properties.hdd = req.body.nhdd || properties.hdd;
      properties.addhdd = req.body.addhdd
        ? Number(req.body.addhdd) + Number(properties.addhdd)
        : properties.addhdd;
      properties.removehdd = req.body.removehdd
        ? Number(req.body.removehdd) + Number(properties.removehdd)
        : properties.removehdd;
      properties.display = req.body.adddisplay || properties.display;
      properties.adddisplay = req.body.adddisplay || properties.adddisplay;
      properties.removedisplay =
        req.body.removedisplay || properties.removedisplay;
      properties.keyboard = req.body.addkeyboard || properties.keyboard;
      properties.addkeyboard = req.body.addkeyboard || properties.addkeyboard;
      properties.removekeyboard =
        req.body.removekeyboard || properties.removekeyboard;
      properties.mouse = req.body.addmouse || properties.mouse;
      properties.addmouse = req.body.addmouse || properties.addmouse;
      properties.removemouse = req.body.removemouse || properties.removemouse;
      properties.addlan = req.body.addlan || properties.addlan;
      properties.removelan = req.body.removelan || properties.removelan;
      properties.os = req.body.os || properties.os;
      properties.EntryBy = req.body.EntryBy || properties.EntryBy;
      properties.devicePurchaseId =
        req.body.devicePurchaseId || properties.devicePurchaseId;
      const updatedProperties = await properties.save();
      res.send({
        message: "Properties Updated",
        purchase: updatedProperties,
      });
    } else {
      res.status(404).send({ message: "Properties Not Found" });
    }
  })
);

deviceRouter.delete(
  "/pro/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const properties = await deviceProperties.findOne({
      where: { id: req.params.id },
    });
    if (properties) {
      const deleteProperties = await properties.destroy();
      res.send({ message: "Properties", user: deleteProperties });
    } else {
      res.status(404).send({ message: "Properties Not Found" });
    }
  })
);

deviceRouter.post("/getdevicedetails/:id", async (req, res) => {
  try {
    const onedevicedetails = await devicePurchase.findAll({
      where: { id: req.params.id },
      include: [{ model: deviceProperties }],
    });

    res.send(onedevicedetails);
  } catch (error) {
    res.status(404).send("Fail to get device details");
  }
});

deviceRouter.post(
  "/deviceconsumecreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deviceconsume = new deviceConsume({
      date: req.body.assignDate,
      issueBy: req.body.EntryBy,
      UserId: req.body.assignUserId,
      devicePurchaseId: req.body.devicePurchaseId,
    });
    const createdeviceconsume = await deviceconsume.save();
    res.send({
      message: "Device Consume Created",
      properties: createdeviceconsume,
    });
  })
);

deviceRouter.put(
  "devicepurchaseassign/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchase = await devicePurchase.findOne({
      where: { id: req.params.id },
    });
    if (purchase) {
      purchase.serial = req.body.serial || purchase.serial;
      purchase.brand = req.body.brand || purchase.brand;
      purchase.purchaseDate = req.body.purchaseDate || purchase.purchaseDate;
      purchase.warranty = req.body.warranty || purchase.warranty;
      purchase.EntryBy = req.body.EntryBy || purchase.EntryBy;
      purchase.deviceTypeId = req.body.deviceTypeId || purchase.deviceTypeId;
      purchase.SourceTypeId = req.body.SourceTypeId || purchase.SourceTypeId;
      purchase.assign = Boolean(req.body.assign);
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

deviceRouter.post("/getallassign/:id", async (req, res) => {
  try {
    const getallAssign = await DeviceType.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: devicePurchase,
          include: [
            { model: deviceProperties },
            { model: deviceConsume, include: [User] },
          ],
          // include: [deviceProperties],
          where: { assign: true },
        },
      ],
    });

    res.send(getallAssign);
  } catch (error) {
    res.status(404).send("Fail to get get all assign device");
  }
});

deviceRouter.delete(
  "/deviceconsume/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deviceconsume = await deviceConsume.findOne({
      where: { id: req.params.id },
    });
    if (deviceconsume) {
      const deleteDeviceConsume = await deviceconsume.destroy();
      res.send({
        message: "Delete Device Consume",
        dConsume: deleteDeviceConsume,
      });
    } else {
      res.status(404).send({ message: "Device Consume Not Found" });
    }
  })
);

deviceRouter.post("/searchdevice", async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const cpu = req.query.cpu || "";
  const brand = req.query.brand || "";
  const devicetype = req.query.devicetype || "";
  const username = req.query.username || "";
  const serial = req.query.serial || "";
  const ram = req.query.ram || "";
  const cpuspeed = req.query.cpuspeed || "";
  const graphics = req.query.graphics || "";
  const ssd = req.query.ssd || "";
  const hdd = req.query.hdd || "";
  const display = req.query.display || "";
  const keyboard = req.query.keyboard || "";
  const mouse = req.query.mouse || "";
  const os = req.query.os || "";
  const assign = req.query.assign || "";
  // const assign = Boolean(req.query.assign);
  const cpuFilter = cpu ? { cpu: { $regex: cpu, $options: "" } } : {};

  try {
    const count = await deviceProperties.count({
      where: {
        [connection.Op.and]: [
          {
            [connection.Op.or]: [
              {
                cpu: {
                  [connection.Op.like]: "%" + cpu + "%",
                },
              },
              {
                cpu: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ram: { [connection.Op.like]: "%" + ram + "%" },
              },
              {
                ram: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                cpuspeed: { [connection.Op.like]: "%" + cpuspeed + "%" },
              },
              {
                cpuspeed: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                graphics: { [connection.Op.like]: "%" + graphics + "%" },
              },
              {
                graphics: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ssd: { [connection.Op.like]: "%" + ssd + "%" },
              },
              {
                ssd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                hdd: { [connection.Op.like]: "%" + hdd + "%" },
              },
              {
                hdd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                display: { [connection.Op.like]: "%" + display + "%" },
              },
              {
                display: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                keyboard: { [connection.Op.like]: "%" + keyboard + "%" },
              },
              {
                keyboard: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                mouse: { [connection.Op.like]: "%" + mouse + "%" },
              },
              {
                mouse: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                os: { [connection.Op.like]: "%" + os + "%" },
              },
              {
                os: null,
              },
            ],
          },
        ],
      },
      include: [
        {
          model: devicePurchase,
          // required: true,
          include: [
            {
              model: DeviceType,
              // required: true,
              where: {
                [connection.Op.and]: [
                  {
                    [connection.Op.or]: [
                      {
                        name: {
                          [connection.Op.like]: "%" + devicetype + "%",
                        },
                      },
                      {
                        name: null,
                      },
                    ],
                  },
                ],
              },
            },
            {
              model: deviceConsume,
              // right: true,
              include: [
                {
                  model: User,
                  // required: false,
                  // attributes: ["name"],
                  // where: { name: "Ashique" },
                  // required: false,
                  where: {
                    [connection.Op.and]: [
                      {
                        [connection.Op.or]: [
                          {
                            name: {
                              [connection.Op.like]: "%" + username + "%",
                            },
                          },
                          {
                            name: null,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          where: {
            [connection.Op.and]: [
              {
                [connection.Op.or]: [
                  {
                    serial: {
                      [connection.Op.like]: "%" + serial + "%",
                    },
                  },
                  {
                    serial: null,
                  },
                ],
              },
              {
                [connection.Op.or]: [
                  {
                    brand: {
                      [connection.Op.like]: "%" + brand + "%",
                    },
                  },
                  {
                    brand: null,
                  },
                ],
              },
              {
                [connection.Op.or]: [
                  {
                    assign: {
                      [connection.Op.like]: "%" + assign + "%",
                    },
                  },
                  {
                    assign: null,
                  },
                ],
              },
            ],
          },
        },
      ],

      offset: pageSize * (page - 1),
      limit: pageSize,
      // order: [["createdAt", "DESC"]],
    });

    const getallDeviceSearch = await deviceProperties.findAll({
      where: {
        [connection.Op.and]: [
          {
            [connection.Op.or]: [
              {
                cpu: {
                  [connection.Op.like]: "%" + cpu + "%",
                },
              },
              {
                cpu: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ram: { [connection.Op.like]: "%" + ram + "%" },
              },
              {
                ram: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                cpuspeed: { [connection.Op.like]: "%" + cpuspeed + "%" },
              },
              {
                cpuspeed: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                graphics: { [connection.Op.like]: "%" + graphics + "%" },
              },
              {
                graphics: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ssd: { [connection.Op.like]: "%" + ssd + "%" },
              },
              {
                ssd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                hdd: { [connection.Op.like]: "%" + hdd + "%" },
              },
              {
                hdd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                display: { [connection.Op.like]: "%" + display + "%" },
              },
              {
                display: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                keyboard: { [connection.Op.like]: "%" + keyboard + "%" },
              },
              {
                keyboard: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                mouse: { [connection.Op.like]: "%" + mouse + "%" },
              },
              {
                mouse: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                os: { [connection.Op.like]: "%" + os + "%" },
              },
              {
                os: null,
              },
            ],
          },
        ],
      },
      include: [
        {
          model: devicePurchase,
          // required: true,
          include: [
            {
              model: DeviceType,
              // required: true,
              where: {
                [connection.Op.and]: [
                  {
                    [connection.Op.or]: [
                      {
                        name: {
                          [connection.Op.like]: "%" + devicetype + "%",
                        },
                      },
                      {
                        name: null,
                      },
                    ],
                  },
                ],
              },
            },
            {
              model: deviceConsume,
              // right: true,
              include: [
                {
                  model: User,
                  // required: false,
                  // attributes: ["name"],
                  // where: { name: "Ashique" },
                  // required: false,
                  where: {
                    [connection.Op.and]: [
                      {
                        [connection.Op.or]: [
                          {
                            name: {
                              [connection.Op.like]: "%" + username + "%",
                            },
                          },
                          {
                            name: null,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          where: {
            [connection.Op.and]: [
              {
                [connection.Op.or]: [
                  {
                    serial: {
                      [connection.Op.like]: "%" + serial + "%",
                    },
                  },
                  {
                    serial: null,
                  },
                ],
              },
              {
                [connection.Op.or]: [
                  {
                    brand: {
                      [connection.Op.like]: "%" + brand + "%",
                    },
                  },
                  {
                    brand: null,
                  },
                ],
              },
              {
                [connection.Op.or]: [
                  {
                    assign: {
                      [connection.Op.like]: "%" + assign + "%",
                    },
                  },
                  {
                    assign: null,
                  },
                ],
              },
            ],
          },
        },
      ],

      offset: pageSize * (page - 1),
      limit: pageSize,
      // order: [["createdAt", "DESC"]],
    });

    const getallAssign = await deviceProperties.findAll({
      where: {
        [connection.Op.or]: [
          {
            [connection.Op.or]: [
              {
                cpu: {
                  [connection.Op.like]: "%" + cpu + "%",
                },
              },
              {
                cpu: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ram: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                ram: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                cpuspeed: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                cpuspeed: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                graphics: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                graphics: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ssd: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                ssd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                hdd: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                hdd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                display: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                display: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                keyboard: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                keyboard: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                mouse: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                mouse: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                os: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                os: null,
              },
            ],
          },
        ],
        // [connection.Op.or]: [
        //   {
        //     cpu: {
        //       [connection.Op.like]: "%" + cpu + "%",
        //     },
        //     ram: {
        //       [connection.Op.like]: "%" + ram + "%",
        //     },
        // cpuspeed: {
        //   [connection.Op.like]: "%" + cpuspeed + "%",
        // },
        // graphics: {
        //   [connection.Op.like]: "%" + graphics + "%",
        // },
        // ssd: {
        //   [connection.Op.like]: "%" + ssd + "%",
        // },
        // hdd: {
        //   [connection.Op.like]: "%" + hdd + "%",
        // },
        // display: {
        //   [connection.Op.like]: "%" + display + "%",
        // },
        // keyboard: {
        //   [connection.Op.like]: "%" + keyboard + "%",
        // },
        // mouse: {
        //   [connection.Op.like]: "%" + mouse + "%",
        // },
        // os: {
        //   [connection.Op.like]: "%" + os + "%",
        // },
        //   },
        // ],
      },
      include: [
        {
          model: devicePurchase,
          include: [
            { model: DeviceType },
            { model: deviceConsume, include: [User] },
          ],
          // where: {
          //   [connection.Op.or]: [
          //     {
          //       [connection.Op.or]: [
          //         {
          //           serial: {
          //             [connection.Op.like]: "%" + cpu + "%",
          //           },
          //         },
          //         {
          //           serial: null,
          //         },
          //       ],
          //     },
          //     {
          //       [connection.Op.or]: [
          //         {
          //           brand: { [connection.Op.like]: "%" + cpu + "%" },
          //         },
          //         {
          //           brand: null,
          //         },
          //       ],
          //     },
          //   ],
          // },
        },
      ],

      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    const countPages = await deviceProperties.count({
      where: {
        [connection.Op.or]: [
          {
            [connection.Op.or]: [
              {
                cpu: {
                  [connection.Op.like]: "%" + cpu + "%",
                },
              },
              {
                cpu: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ram: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                ram: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                cpuspeed: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                cpuspeed: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                graphics: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                graphics: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                ssd: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                ssd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                hdd: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                hdd: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                display: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                display: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                keyboard: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                keyboard: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                mouse: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                mouse: null,
              },
            ],
          },
          {
            [connection.Op.or]: [
              {
                os: { [connection.Op.like]: "%" + cpu + "%" },
              },
              {
                os: null,
              },
            ],
          },
        ],
        // [connection.Op.or]: [
        //   {
        //     cpu: {
        //       [connection.Op.like]: "%" + cpu + "%",
        //     },
        //     ram: {
        //       [connection.Op.like]: "%" + ram + "%",
        //     },
        // cpuspeed: {
        //   [connection.Op.like]: "%" + cpuspeed + "%",
        // },
        // graphics: {
        //   [connection.Op.like]: "%" + graphics + "%",
        // },
        // ssd: {
        //   [connection.Op.like]: "%" + ssd + "%",
        // },
        // hdd: {
        //   [connection.Op.like]: "%" + hdd + "%",
        // },
        // display: {
        //   [connection.Op.like]: "%" + display + "%",
        // },
        // keyboard: {
        //   [connection.Op.like]: "%" + keyboard + "%",
        // },
        // mouse: {
        //   [connection.Op.like]: "%" + mouse + "%",
        // },
        // os: {
        //   [connection.Op.like]: "%" + os + "%",
        // },
        //   },
        // ],
      },
      include: [
        {
          model: devicePurchase,
          include: [
            { model: DeviceType },
            { model: deviceConsume, include: [User] },
          ],
          // where: {
          //   [connection.Op.or]: [
          //     {
          //       [connection.Op.or]: [
          //         {
          //           serial: {
          //             [connection.Op.like]: "%" + cpu + "%",
          //           },
          //         },
          //         {
          //           serial: null,
          //         },
          //       ],
          //     },
          //     {
          //       [connection.Op.or]: [
          //         {
          //           brand: { [connection.Op.like]: "%" + cpu + "%" },
          //         },
          //         {
          //           brand: null,
          //         },
          //       ],
          //     },
          //   ],
          // },
        },
      ],

      offset: pageSize * (page - 1),
      limit: pageSize,
    });

    const getallSerialnBrand = await deviceProperties.findAll({
      include: [
        {
          model: devicePurchase,
          include: [
            { model: DeviceType },
            { model: deviceConsume, include: [User] },
          ],
          where: {
            [connection.Op.or]: [
              {
                [connection.Op.or]: [
                  {
                    serial: {
                      [connection.Op.like]: "%" + cpu + "%",
                    },
                  },
                  {
                    serial: null,
                  },
                ],
              },
              {
                [connection.Op.or]: [
                  {
                    brand: {
                      [connection.Op.like]: "%" + cpu + "%",
                    },
                  },
                  {
                    brand: null,
                  },
                ],
              },
            ],
          },
        },
      ],

      offset: pageSize * (page - 1),
      limit: pageSize,
    });

    const getDeviceName = await deviceProperties.findAll({
      include: [
        {
          model: devicePurchase,
          required: true,
          include: [
            {
              model: DeviceType,
              required: true,
              where: {
                [connection.Op.or]: [
                  {
                    [connection.Op.or]: [
                      {
                        name: {
                          [connection.Op.like]: "%" + cpu + "%",
                        },
                      },
                      {
                        name: null,
                      },
                    ],
                  },
                ],
              },
            },
            { model: deviceConsume, include: [User] },
          ],
        },
      ],

      offset: pageSize * (page - 1),
      limit: pageSize,
    });

    const getDeviceUserName = await deviceProperties.findAll({
      include: [
        {
          model: devicePurchase,
          required: true,
          // required: false,
          include: [
            {
              model: DeviceType,
              required: true,
            },
            {
              model: deviceConsume,
              right: true,
              include: [
                {
                  model: User,
                  required: true,
                  // attributes: ["name"],
                  // where: { name: "Ashique" },
                  // required: false,
                  where: {
                    [connection.Op.or]: [
                      {
                        [connection.Op.or]: [
                          {
                            name: {
                              [connection.Op.like]: "%" + cpu + "%",
                            },
                          },
                          {
                            name: null,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
      offset: pageSize * (page - 1),
      limit: pageSize,
    });

    // var finalArr = removeDuplicates(finalArrr);
    const finalArrs = getallAssign.concat(
      getallSerialnBrand,
      getDeviceName,
      getDeviceUserName
    );
    // const finalArr = getallAssign.concat(getallSerialnBrand).unique();

    const ids = finalArrs.map((o) => o.id);
    const finalArr = finalArrs.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );

    const length = finalArr.length;

    res.send({
      getallDeviceSearch,
      finalArr,
      length,
      page,
      pagess: Math.ceil(countPages / pageSize),
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(404).send("Fail to get get all assign device");
  }
});

deviceRouter.get("/allpro", async (req, res) => {
  try {
    const cpu = await deviceProperties.findAll({
      attributes: [
        [
          connection.sequelize.fn("DISTINCT", connection.sequelize.col("cpu")),
          "cpu",
        ],
      ],
    });
    const ram = await deviceProperties.findAll({
      attributes: [
        [
          connection.sequelize.fn("DISTINCT", connection.sequelize.col("ram")),
          "ram",
        ],
      ],
    });
    const graphics = await deviceProperties.findAll({
      attributes: [
        [
          connection.sequelize.fn(
            "DISTINCT",
            connection.sequelize.col("graphics")
          ),
          "graphics",
        ],
      ],
    });
    const ssd = await deviceProperties.findAll({
      attributes: [
        [
          connection.sequelize.fn("DISTINCT", connection.sequelize.col("ssd")),
          "ssd",
        ],
      ],
    });
    const hdd = await deviceProperties.findAll({
      attributes: [
        [
          connection.sequelize.fn("DISTINCT", connection.sequelize.col("hdd")),
          "hdd",
        ],
      ],
    });
    const display = await deviceProperties.findAll({
      attributes: [
        [
          connection.sequelize.fn(
            "DISTINCT",
            connection.sequelize.col("display")
          ),
          "display",
        ],
      ],
    });
    const os = await deviceProperties.findAll({
      attributes: [
        [
          connection.sequelize.fn("DISTINCT", connection.sequelize.col("os")),
          "os",
        ],
      ],
    });

    res.send({ cpu, ram, graphics, ssd, hdd, display, os });
  } catch (error) {
    res.status(404).send("Fail to get device properties");
  }
});

// deviceRouter.get("/allpro", async (req, res) => {
//   try {
//     const cpu = await deviceProperties.findAll({
//       attributes: [
//         [
//           connection.sequelize.fn("DISTINCT", connection.sequelize.col("cpu")),
//           "cpu",
//         ],
//       ],
//     });
//     const ram = await deviceProperties.findAll({
//       attributes: [
//         [
//           connection.sequelize.fn(
//             "DISTINCT",
//             connection.sequelize.literal("ram + addram - removeram")
//           ),
//           "ram",
//         ],
//       ],
//     });
//     const graphics = await deviceProperties.findAll({
//       attributes: [
//         [
//           connection.sequelize.fn(
//             "DISTINCT",
//             connection.sequelize.literal(
//               "graphics + addgraphics - removegraphics"
//             )
//           ),
//           "graphics",
//         ],
//       ],
//     });
//     const ssd = await deviceProperties.findAll({
//       attributes: [
//         [
//           connection.sequelize.fn(
//             "DISTINCT",
//             connection.sequelize.literal("ssd + addssd - removessd")
//           ),
//           "ssd",
//         ],
//       ],
//     });
//     const hdd = await deviceProperties.findAll({
//       attributes: [
//         [
//           connection.sequelize.fn(
//             "DISTINCT",
//             connection.sequelize.literal("hdd + addhdd - removehdd")
//           ),
//           "hdd",
//         ],
//       ],
//     });
//     const display = await deviceProperties.findAll({
//       attributes: [
//         [
//           connection.sequelize.fn(
//             "DISTINCT",
//             connection.sequelize.col("display")
//           ),
//           "display",
//         ],
//       ],
//     });
//     const os = await deviceProperties.findAll({
//       attributes: [
//         [
//           connection.sequelize.fn("DISTINCT", connection.sequelize.col("os")),
//           "os",
//         ],
//       ],
//     });

//     res.send({ cpu, ram, graphics, ssd, hdd, display, os });
//   } catch (error) {
//     res.status(404).send("Fail to get device properties");
//   }
// });

deviceRouter.get("/getallDevice", async (req, res) => {
  try {
    const getallDevice = await deviceProperties.findAndCountAll({
      include: [
        {
          model: devicePurchase,
          include: [
            { model: DeviceType },
            { model: deviceConsume, include: [User] },
          ],
        },
      ],
    });

    res.send(getallDevice);
  } catch (error) {
    res.status(404).send("Fail to get device all properties details");
  }
});

deviceRouter.get(
  "/sumdevices",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const alldeviceType = await DeviceType.findAll({
        attributes: [
          "id",
          "name",
          [
            connection.sequelize.fn(
              "count",
              connection.sequelize.col("deviceTypeId")
            ),
            "devices",
          ],
        ],

        include: [
          {
            model: devicePurchase,
            attributes: [],
          },
        ],

        group: ["DeviceType.id", "DeviceType.name"],
        raw: true,
      });

      const getDeviceBrand = await devicePurchase.findAll({
        attributes: [
          "deviceTypeId",
          "brand",
          [
            connection.sequelize.fn(
              "count",
              connection.sequelize.col("deviceTypeId")
            ),
            "devices",
          ],
        ],
        include: [
          {
            model: DeviceType,
            attributes: ["name"],
          },
        ],
        group: [
          "DeviceType.id",
          "DeviceType.name",
          "devicePurchase.brand",
          "devicePurchase.deviceTypeId",
        ],
        raw: true,
      });

      const getDeviceCpu = await deviceProperties.findAll({
        attributes: [
          "deviceTypeId",
          "cpu",
          [
            connection.sequelize.fn(
              "count",
              connection.sequelize.col("deviceTypeId")
            ),
            "devices",
          ],
        ],
        include: [{ model: DeviceType, attributes: ["name"] }],
        group: [
          "DeviceType.id",
          "DeviceType.name",
          "deviceProperties.cpu",
          "deviceProperties.deviceTypeId",
        ],
      });

      res.send({ alldeviceType, getDeviceBrand, getDeviceCpu });
    } catch (error) {
      res.status(401).send({ message: "Not Found Con Sum" });
    }
  })
);

// deviceRouter.get(
//   "/tests",expressAsyncHandler(async(req, res) => {

//   const cpu = req.query.cpu || "";
//     try {
//       const getDeviceName = await deviceProperties.findAll({where: {
//         [connection.Op.or]: [
//           {
//             [connection.Op.or]: [
//               {
//                 name: {
//                   [connection.Op.like]: "%" + cpu + "%",
//                 },
//               },
//               {
//                 name: null,
//               },
//             ],
//           },
//         ],
//       },
//         include: [
//           {
//             model: devicePurchase,
//             required: true,
//             include: [
//               {
//                 model: DeviceType,
//                 required: true,

//               },
//               { model: deviceConsume, include: [User] },
//             ],
//           },
//         ],

//         offset: pageSize * (page - 1),
//         limit: pageSize,
//       });
//       res.send(getDeviceName)
//     } catch (error) {
//       res.status(401).send({ message: "Nothing" });
//     }
//   })
// )

export default deviceRouter;
