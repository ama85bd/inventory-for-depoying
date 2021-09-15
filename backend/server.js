import express from "express";
import dotenv from "dotenv";
import testRouter from "./testcon.js";
import cors from "cors";
import bodyParser from "body-parser";
import connection from "./connection.js";
import userRouter from "./routers/userRouter.js";
import stationaryRouter from "./routers/stationaryRouter.js";
import sourceRouter from "./routers/sourceRouter.js";
import stationaryPurchaseRouter from "./routers/stationaryPurchaseRouter.js";
import deviceRouter from "./routers/deviceRouter.js";
dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
  JWT_SECRET,
} = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app(cors());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

app.use("/api", testRouter);
app.use("/api/users", userRouter);
app.use("/api/stationary", stationaryRouter);
app.use("/api/source", sourceRouter);
app.use("/api/purchase", stationaryPurchaseRouter);
app.use("/api/device", deviceRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  console.log("Ready");
  res.send("Server is ready");
});

connection.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const port = PORT || 5001;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
