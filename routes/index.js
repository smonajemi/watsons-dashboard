var express = require('express')
var router = express.Router()
const path = require("path")
const Menu = require("../modules/Menu")
const upload = require("../middleware/upload")
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
require('dotenv/config')




// 
let gfs, gridfsBucket
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'menus'
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('menus');
})


// GET REQUESTS

//Find Menu
router.get('/menu', (req, res) => {
  gfs.files.findOne({}, {sort: {uploadDate: -1}}, (err, file) => {
    if (!file || file.length === 0) return res.status(404).json({error: 'No file exists'});
    res.redirect(`/menu/${file.filename}`)
  })
})
//Render Menu
router.get("/menu/:filename", (req, res, next) => {
  gfs.files.findOne({filename : req.params.filename}, (err, file) => {
  if (!file || file.length === 0) return res.status(404).json({error: 'No file exists'});
  if (file.contentType === 'application/pdf') {
    const readStream = gridfsBucket.openDownloadStream(file._id);
    res.contentType('application/pdf')
    readStream.pipe(res);
  } else {
    res.status(404).json({error: 'not a pdf'})
  }
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
  res.redirect('/')
    //   const newMenu = new Menu({
  //   name: formFile.filename,
  //   file: formFile.path,
  // })
  // const stream = fs.createReadStream(file.path);
  // storage.fromStream(stream, req, file)
  //   .then(() => res.send('File uploaded'))
  //   .catch(() => res.status(500).send('error'));
// const formFile = req.file
// let dataReceived = ''
// try {
//   const newMenu = new Menu({
//     name: formFile.filename,
//     description: "Watson's Toronto Menu - QR Code",
//     file: formFile.path,
//   })
//   newMenu.save()
// } catch (error) {
//   req.file = null
//   dataReceived = "Your submission was not successful" +
//     `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a><br/><br/`
//   res.status(200).send(dataReceived + error)
// }
// dataReceived = "Your submission was successful" +
//   `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a>` +
//   "<br/><br/> You uploaded: " + JSON.stringify(formFile.originalname) +
//   `<br/><br/><a class="btn" href="/menu" target="_blank"><button>View Uploaded Menu</button></a>`
// res.status(200).send(dataReceived)
// req.file = null
})


//Helper Function - Authenticated
function isLoggedIn(req, res, next) {
  !req.session.user ? res.redirect('login') : next()
}

//Redirect 404
router.use('*', (req, res, next) => {
  res.redirect('/')
})


// /** RULES OF OUR API */
// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization')
//   if (req.method === 'OPTIONS') {
//       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
//       res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
//       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
//       return res.status(200).json({})
//   }
//   next()
// })
module.exports = router
