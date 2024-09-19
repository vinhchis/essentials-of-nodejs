const mongoose = require("mongoose")

const product = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
})

module.exports = mongoose.model("products", product)
module.exports = {
    
};
