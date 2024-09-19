var express = require("express");
var router = express.Router();
const multer = require("multer");

const productModel = require("../models/productModel");

// setting multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// create a instance multer
var upload = multer({
  storage: storage, 
});


router.get("/", async function (req, res, next) {
  const products = await productModel.find();
  res.render("product/index", { title: "product List", products: products });
});

// router.get("/search", async function (req, res, next) {
//   const keyword = req.query.keyword;
//   const products = await productModel.find({"name": new RegExp(keyword, i)});
//   res.render("product/index", { title: "product List", products: products });
// });

// router.get("/create", (req,res,next) => {
//   res.render("product/create", {title: "Create Product"})
// })

router.post("/create", upload.single('image'), async (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let product = new productModel({
    name: body.name,
    price: body.price,
    image: file.filename
  })

  await product.save();
  return res.redirect("/product/index")
})

// TODO: Search, update and delete

module.exports = router;
