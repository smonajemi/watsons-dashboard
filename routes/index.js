var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:" Watson's Toronto", isHome: true})
})

router.get('*', function(req,res,next) {
  res.redirect('/')
})

module.exports = router;
