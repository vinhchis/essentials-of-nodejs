const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema({
  id: { type: Number },
  fullName: { type: String },
  dob: { type: Number },
  reputation: {
    type: String,
  },
  photo: {
    type: String,
  },
});

module.exports = mongoose.model("People", peopleSchema);
