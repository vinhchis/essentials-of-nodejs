const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  email: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("Customer", CustomerSchema);
