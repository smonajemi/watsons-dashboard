var express = require('express');
var router = express.Router();
const Menu = require('../modules/Menu')
const upload = require('../middlewares/upload')
const fetch = require('fetch')
/* GET menu */
router.get('/', function(req, res, next) {
  res.redirect('/dashboard')
})
router.post("/", upload.single('file'), (req, res, next) => {
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
              console.log("it was saved!")
              return res.status(200).json(newMenu)
      };
  });
} 
});

/** RULES OF OUR API */
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
      return res.status(200).json({});
  }
  next();
});

module.exports = router;
