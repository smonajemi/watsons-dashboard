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

//Render MENU
router.get("/menu", (req, res, next) => {
  gfs.files.findOne({_id : "62c733e6010dfe4b93ccc524"}, (err, file) => {
  if (!file || file.length === 0) return res.status(404).json({error: 'No file exists'});
  return res.json(file)
})
})

router.get("/menus/:filename", (req, res, next) => {
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
