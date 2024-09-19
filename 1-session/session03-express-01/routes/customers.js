var express = require("express");
var router = express.Router();

const customerModel = require("../models/customerModel");

const sampleCustomers = [
  {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
  },
  {
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987654321",
  },
  {
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0369852147",
  },
];

const addCustomers = async () => {
  try {
    await customerModel.insertMany(sampleCustomers);
    console.log("Đã thêm 3 khách hàng vào database");
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng:", error);
  } finally {
    // mongoose.connection.close();
  }
};

// addCustomers()

router.get("/", async function (req, res) {
  let customers = await customerModel.find();
  res.render("customers/index", { customers: customers });
});

router.get("/create", async function (req, res) {
  res.render("customers/create");
});

router.post("/form-create", async function (req, res) {
  try {
    const newCust = new customerModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    await newCust.save();
    res.redirect("/customers/");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/delete/:id', async (req, res) => {
  try {
    await customerModel.findByIdAndDelete(req.params.id);
    res.redirect('/customers/');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/form-update/:id", async function (req, res) {
  let customer = await customerModel.findById(req.params.id);
  res.render("customers/update", { customer: customer });
});

router.post('/update/:id', async (req, res) => {
  try {
    await customerModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    });
    res.redirect('/customers');
  } catch (err) {
    res.status(500).send(err);
  }
});

// search
router.get('/search', async (req, res) => {
  try{
    const regex = new RegExp(req.query.q, 'i');
    let customers = await customerModel.find({
      name: {
        $regex: regex
      }
    })
    res.render("customers/index", { customers: customers });
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;
