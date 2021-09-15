import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      dbName: user.dbName,
      Dept: user.Dept,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "thisismysecret",
    { expiresIn: "30d" }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "thisismysecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Auth Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Auth Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

// module.exports = {
//   generateToken,
//   isAuth,
//   isAdmin,
// };
