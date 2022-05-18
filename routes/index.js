var express = require('express');
var router = express.Router();
const path = require("path");
const Menu = require("../modules/Menu");
const upload = require("../middlewares/upload");
require('dotenv/config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title:"Dashboard", isDash: true})
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

router.post("/", upload.single("file"), async (req, res, next) => {
  const formFile = req.file;
  let dataReceived = ''
  if (formFile) {
    const newMenu = new Menu({
      name: formFile.filename,
      description: "Watson's Toronto Menu - QR Code",
      file: formFile.path,
    });
    try {
      newMenu.save()
      dataReceived = "Your submission was successful" +
      `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a>` + 
      "<br/><br/> You uploaded: " + JSON.stringify(formFile.originalname) +
      `<br/><br/><a class="btn" href="/menu" target="_blank"><button>View Uploaded Menu</button></a>`
      res.send(dataReceived);
    } catch (error) {
      dataReceived = "Your submission was not successful" +
      `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a>`
      res.send(dataReceived);
    }
  } 
  res.end()
});

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
