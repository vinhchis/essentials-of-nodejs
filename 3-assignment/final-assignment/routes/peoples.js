var express = require("express");
var router = express.Router();

const peopleModel = require("../models/peoplesModel");

router.get("/", async function (req, res) {
  let peoples = await peopleModel.find();
  res.render("peoples/index", { peoples: peoples });
});

// search
router.get("/search", async (req, res) => {
  try {
    const regex = new RegExp(req.query.q, "i");
    let peoples = await peopleModel.find({
      fullName: {
        $regex: regex,
      },
    });
    res.render("peoples/index", { peoples: peoples });
  } catch (err) {
    res.status(500).send(err);
  }
});

// create form
router.get("/create", async function (req, res) {
  res.render("peoples/create");
});

//
router.post("/form-create", async function (req, res) {
  try {
    const newPeople = new peopleModel({
      fullName: req.body.fullName,
      dob: req.body.dob,
      reputation: req.body.reputation,
      photo: req.body.photo,
    });

    await newPeople.save();
    res.redirect("/peoples/");
  } catch (e) {
    res.status(500).send(e);
  }
});

//
router.get("/detail/:id", async function (req, res) {
  let people = await peopleModel.findById(req.params.id);
  res.render("peoples/detail", { people: people });
});

module.exports = router;
