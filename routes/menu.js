var express = require('express');
var router = express.Router();
const Menu = require('../modules/Menu')
const upload = require('../middlewares/upload')
const path = require('path');
let exit = Boolean(false);

/* GET menu */
router.get('/', function(req, res, next) {
  res.send(req.body)
})


/** RULES OF OUR API */
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', 'https://young-dawn-06072.herokuapp.com');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
      return res.status(200).json({});
  }
  next();
});

module.exports = router;
