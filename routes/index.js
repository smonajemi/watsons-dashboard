var express = require('express')
var router = express.Router()
const path = require("path")
const Menu = require("../modules/Menu")
const upload = require("../middleware/middleware")
require('dotenv/config')

// GET REQUESTS

//Render MENU
router.get("/menu", (req, res, next) => {
  const options = {
    root: path.join(__dirname.replace('routes', 'uploads'))
  }
  const fileName = process.env.UPLOADED_FILENAME
  console.log(fileName)
  res.status(200).sendFile(fileName, options, (err) => {
    if (err) next(err)
  })
})

//Render Login
router.get("/login", (req, res) => {
  res.render('login', { title: "Login"})
})

//Redirect homePage
router.get('/', isLoggedIn, (req,res,next) => {
  res.redirect(`/${req.session.user.username}`)
})

//Render adminPage
router.get('/:username', isLoggedIn, (req, res, next) => {
  res.render('dashboard', { title: "Dashboard", isDash: true, user: req.session.user})
})
  

// POST REQUESTS

//Upload Menu
router.post("/menu", upload.single("file"), (req, res, next) => {
const formFile = req.file
let dataReceived = ''
try {
  const newMenu = new Menu({
    name: formFile.filename,
    description: "Watson's Toronto Menu - QR Code",
    file: formFile.path,
  })
  newMenu.save()
} catch (error) {
  req.file = null
  dataReceived = "Your submission was not successful" +
    `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a><br/><br/`
  res.status(200).send(dataReceived + error)
}
dataReceived = "Your submission was successful" +
  `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a>` +
  "<br/><br/> You uploaded: " + JSON.stringify(formFile.originalname) +
  `<br/><br/><a class="btn" href="/menu" target="_blank"><button>View Uploaded Menu</button></a>`
res.status(200).send(dataReceived)
req.file = null
})






//Helper Function - Authenticated
function isLoggedIn(req, res, next) {
  if (!req.session.user) res.redirect('login')
      else next()
};

//Redirect 404
router.use('*', (req, res, next) => {
  res.redirect('/')
})


// /** RULES OF OUR API */
// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
//       res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//       return res.status(200).json({});
//   }
//   next();
// });
module.exports = router
