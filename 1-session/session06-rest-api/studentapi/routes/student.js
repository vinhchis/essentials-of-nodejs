var express = require('express');
var router = express.Router();
const studentModel = require('../models/studentModel')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    const students = await studentModel.find();
    res.status(200).json(students);
  } catch (err){

  }
});

router.get('/:id', async function(req, res, next) {
    try{
      const student = await studentModel.findById(req.params.id);
      res.status(200).json(students);
    } catch (err){
      
    }
  });

module.exports = router;
