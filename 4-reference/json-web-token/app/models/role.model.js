const mongoose = require("mongoose");

const Role = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("roles", Role);
