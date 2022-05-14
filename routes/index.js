var express = require('express');
var router = express.Router();
require('dotenv/config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('watsons', { title:"Watson's Toronto", layout: 'main', isHome: true})
})
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title:"Dashboard", layout: 'dashboard', isDash: true})
})
router.get('/reservations', function(req, res, next) {
  res.render('partials/reservations', { title:"Watson's Reservation",layout: 'main',  isReservation: true})
})
router.get('/qr', function(req, res, next) {
  // const urlAddress = req.protocol + '://' + req.get('host');
  const urlAddress = req.headers.host.includes('localhost') ? process.env.HOST_LOCAL : process.env.HOST_DEV 
  res.render('menu', { title:"Watson's Toronto", url: urlAddress})
})

module.exports = router;
