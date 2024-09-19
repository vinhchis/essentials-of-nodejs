const mongoose = require("mongoose")

const student = mongoose.Schema({
    name: String,
    email: String,
    gpa: Number
})

module.exports = mongoose.model("students", student)