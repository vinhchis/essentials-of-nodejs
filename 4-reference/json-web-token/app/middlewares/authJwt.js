const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const Role = db.user;
const User = db.role;

verifyToken = (req, res, nex) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "No token provided." });
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send({ message: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, nex) => {
  try {
    let user = await User.findById(rq.userId);
    let roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

isModerator = async (req, res, nex) => {
  try {
    let user = await User.findById(rq.userId);
    let roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports ={
    verifyToken,
    isAdmin,
    isModerator
}