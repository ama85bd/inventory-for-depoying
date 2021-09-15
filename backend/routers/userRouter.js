import express from "express";
import data from "../data.js";
import User from "../models/usermodel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../utils.js";
const userRouter = express.Router();

userRouter.post("/seed", async (req, res) => {
  try {
    const createUser = await User.bulkCreate(data.users);
    res.send({ createUser });
  } catch (error) {
    res.status(404).send("Fail to create");
  }
});

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const allUser = await User.findAll();
      res.send(allUser);
    } catch (error) {
      res.status(401).send({ message: "Your are not admin" });
    }
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          dept: user.dept,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      dept: req.body.dept,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createUsers = await user.save();
    res.send({
      id: createUsers.id,
      name: createUsers.name,
      email: createUsers.email,
      isAdmin: createUsers.isAdmin,
      dept: createUsers.dept,
      token: generateToken(createUsers),
    });
  })
);

userRouter.post(
  "/userCreate",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      dept: req.body.dept,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createUsers = await user.save();
    res.send({ message: "User Created", user: createUsers });
  })
);

userRouter.get("/:id", async (req, res) => {
  try {
    const oneUser = await User.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.send(oneUser);
  } catch (error) {
    res.status(404).send("Fail to get user");
  }
});

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      if (user.email === "asif@lged.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.destroy();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.dept = req.body.dept || user.dept;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/pass/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 8);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRouter;
