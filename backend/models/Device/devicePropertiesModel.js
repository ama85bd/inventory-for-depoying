import connection from "../../connection.js";

const deviceProperties = connection.sequelize.define(
  "deviceProperties",
  {
    id: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    cpu: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
    cpuspeed: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ram: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    graphics: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    ssd: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    hdd: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    display: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    keyboard: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
    mouse: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },
    os: {
      type: connection.DataTypes.STRING,
      allowNull: false,
    },

    EntryBy: {
      type: connection.DataTypes.INTEGER,
      allowNull: false,
    },
    addram: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    removeram: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    addssd: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    removessd: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    addhdd: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    removehdd: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    addgraphics: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    removegraphics: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    addkeyboard: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    removekeyboard: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    addmouse: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    removemouse: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    addlan: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    removelan: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    adddisplay: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: "0",
    },
    removedisplay: {
      type: connection.DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: "0",
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "deviceProperties",
  }
);

export default deviceProperties;
