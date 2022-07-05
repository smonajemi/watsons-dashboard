var express = require('express')
var router = express.Router()
const Menu = require("../modules/Menu")
const upload = require("../middleware/middleware")

// GET REQUESTS
router.get('/', isLoggedIn, (req,res,next) => {
    res.redirect(`/dashboard/${req.session.user._id}`)
})

router.get('/:userId', isLoggedIn, (req, res, next) => {
  res.render('dashboard', { title: "Dashboard", isDash: true, user: req.session.user})
})

router.get('/login', isLoggedIn, (req,res,next) => {
  res.redirect('/')
})

// POST REQUESTS
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

function isLoggedIn(req, res, next) {
    if (!req.session.user) res.redirect('login')
        else next()
};

module.exports = router
