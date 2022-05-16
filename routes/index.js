var express = require('express');
var router = express.Router();
const Menu = require('../modules/Menu')
const upload = require('../middlewares/upload')
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
  const urlAddress = req.headers.host.includes('localhost') ? process.env.HOST_LOCAL : process.env.HOST_TEST 
  res.render('menu', { title:"Watson's Toronto", url: urlAddress})
})

router.post("/dashboard", upload.single('file'), (req, res) => {
  //test new post
if (req.file) {
  const newMenu = new Menu({
    name: req.file.filename,
    description: req.file.originalname,
    file: req.file.path
  })
    newMenu.save(function(err) {
      if (err !== null) {
          //object was not save
          console.log(err);
          return res.status(404).json(err)
              } else {
                exit = true
            const dataReceived = `Your submission was received`
            req.body = newMenu
            return res.status(200).send(dataReceived + req.body)
  };
});
} 
});



module.exports = router;
