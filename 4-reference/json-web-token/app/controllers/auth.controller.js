const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const body = req.body;
  const user = new user({
    username: body.username,
    email: body.email,
    password: await bcrypt.hash(body.password, 8),
  });
  try {
    if (body.roles) {
      const foundRoles = await Role.find({ name: { $in: body.roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      let rr = await Role.findOne({ name: "user" });
      user.roles = [rr._id];
    }
    res.status(200).json({ message: "User created registered successfully" });
    await user.save();
  } catch (error) {
    res.status(500).send({ message: "Error creatign user" });
    return;
  }
};

exports.signin = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findOne({ username: body.username }).populate(
      "roles",
      "__v"
    );
    if (!user) {
      res.status(400).send({ message: "User not found" });
    }
    var passwordIsValid = await bcrypt.compare(body.password, user.password);

    //sai pass
    if (!passwordIsValid) {
      return res.status(400).send({ message: "Invalid Password..." });
    }

    //dung pass
    const token = jwt.sign({ userId: user._id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
