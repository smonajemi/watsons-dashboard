var express = require("express");
var router = express.Router();
const Menu = require("../modules/Menu");
const upload = require("../middlewares/upload");
const fs = require('fs-extra')
const path = require('path')
require('dotenv/config')
/* GET menu */
// router.get("/", (req, res, next) => {
//   res.send('Hello World')
// });



// router.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/plain');
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//       res.setHeader('Access-Control-Allow-Origin', process.env.HOST_DEV);
//       res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//       return res.status(200).json({});
//   }
//   next();
// });


module.exports = router;
