var express = require('express');
var router = express.Router();
const path = require("path");
const Menu = require('../modules/Menu');
require('dotenv/config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title:"Dashboard", layout: 'dashboard', isDash: true})
  // res.redirect('back');
})
router.get('/index', function(req, res, next) {
  res.redirect('/')
  // res.redirect('back');
})
router.get("/menu", (req, res, next) => {
    const options = {
        root: path.join(__dirname.replace('routes', 'uploads'))
    };
    const fileName = 'watsonsToronto.pdf';
    res.status(200).sendFile(fileName, options, (err) => {
        err ? next(err) : next()
    });
});
router.get('*', function(req, res, next) {
  res.redirect('/')
})

/** RULES OF OUR API */
// router.use((req, res, next) => {
//   res.setHeader('Content-Type', 'application/pdf');
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
