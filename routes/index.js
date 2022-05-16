var express = require('express');
var router = express.Router();
const Menu = require('../modules/Menu')
const upload = require('../middlewares/upload')
const fetch = require('node-fetch')

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

router.post("/dashboard", upload.single('file'), (req, res, next) => {
  //test new post
if (req.file) {
  const newMenu = new Menu({
    name: req.file.filename,
    description: req.file.originalname,
    file: req.file.path
  })
  // newMenu.save(function(err) {
  //         if (err !== null) {
  //             //object was not save
  //             console.log(err);
  //             return res.status(404).json(err)
  //                 } else {
  //             console.log("it was saved!")
  //             return res.status(200).json(newMenu)
  //     };   

  // });
  const formFile = req.file;
  const dataReceived = "Your submission was received:<br/><br/>" +
    "Your File data was:<br/>" + JSON.stringify(formFile) +
    "<br/><p>This is the image you sent:<br/><img src='/photos/" + formFile.filename + "'/>";
  res.send(dataReceived);
} 
});
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
