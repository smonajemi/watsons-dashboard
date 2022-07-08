const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const upload = require("../middleware/upload")
const Grid = require('gridfs-stream')
require('dotenv/config')


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
    if (!file || file.length === 0) return res.status(404).json({message: 'No file exists'});
    res.redirect(`/menu/${file.filename}`)
  })
})

//Render Menu
router.get("/menu/:filename", (req, res) => {
  gfs.files.findOne({filename : req.params.filename}, (err, file) => {
  if (!file || file.length === 0) return res.status(404).json({message: 'No file exists'});
  if (file.contentType === 'application/pdf') {
    const readStream = gridfsBucket.openDownloadStream(file._id);
    res.contentType('application/pdf')
    readStream.pipe(res);
  } else {
    res.status(404).json({error: 'server error'})
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
router.get('/:username', isLoggedIn, (req, res) => {
  res.render('dashboard', { title: "Dashboard", isDash: true, user: req.session.user})
})

// POST REQUESTS

//Upload Menu
router.post("/menu", upload.single("file"), (req, res) => {
const formFile = req.file
try {
  if (formFile.mimetype !== 'application/pdf') return res.render('dashboard', {title: "Dashboard", errorMsg: "pdf files only"})
} catch (error) {
  req.file = null
  res.render('error', {title: "Error"})
}
  res.render('success', {title: "Dashboard",user: req.session.user, menu: req.file.originalname, isMenu: true})
})


//Helper Function - Authenticated
function isLoggedIn(req, res, next) {
  !req.session.user ? res.redirect('login') : next()
}

//Redirect 404
router.use('*', (req, res) => {
  res.render('error', {title: "Error"})
})


// /** RULES OF API */
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
