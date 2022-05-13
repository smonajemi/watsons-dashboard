var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title:" Watson's Toronto", isHome: true})
})

// app.use('/uploads', express.static('uploads'))
router.get('/uploads', (req, res) => {
  res.send()
})
// router.get('*', function(req,res,next) {
//   res.redirect('/')
// })

module.exports = router;
