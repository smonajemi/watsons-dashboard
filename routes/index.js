var express = require('express');
var router = express.Router();
const path = require("path");

require('dotenv/config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('watsons', { title:"Watson's Toronto", layout: 'main', isHome: true})
})
router.get('/admin-dashboard', function(req, res, next) {
  res.render('dashboard', { title:"Dashboard", layout: 'dashboard', isDash: true})
})
router.get('/reservations', function(req, res, next) {
  res.render('partials/reservations', { title:"Watson's Reservation", layout: 'main',  isReservation: true})
})

router.get("/menu", (req, res, next) => {
  const options = {
    root: path.join(__dirname.replace("routes", "uploads")),
  };
  const fileName = "watsonsToronto.pdf";
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.get('*', (req,res,next) => {
 res.redirect('/')
})
/** RULES OF OUR API */
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/pdf');
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
