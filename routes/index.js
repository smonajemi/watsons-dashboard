const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const upload = require("../middleware/upload");
const Grid = require("gridfs-stream");
const User = require('../modules/User')
require("dotenv/config");

let gfs, gridBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  })
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection("uploads")
})

// GET REQUESTS
//Find Menu
router.get("/getMenu/:option", (req, res) => {
  const param = req.params.option;
  // console.log(req.params)
  gfs.files.findOne(
    { metadata: param},
    { sort: { uploadDate: -1 } },
    (err, file) => {
      return (!file || file.length === 0) ? res.status(404).json({ message: "No file exists" }) : res.status(200).redirect(`/menu/${file.filename}`);
    }
  )
})

//Render Menu
router.get("/menu/:filename", (req, res) => {
  if (!req.params.filename)
      {
        const param = req.params.option
        gfs.files.findOne(
          { metadata: param},
          { sort: { uploadDate: -1 } },
          (err, file) => {
             return (!file || file.length === 0) ? res.status(404).json({ message: "No file exists" }) : res.status(200).redirect(`/menu/${file.filename}`);
          }
        )
  }
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0)
      return res.status(404).json({ message: "No file exists" })
    if (file.contentType === "application/pdf") {
      const readStream = gridBucket.openDownloadStream(file._id)
      res.contentType("application/pdf")
      readStream.pipe(res)
    } else {
      res.status(404).json({ error: "server error" })
    }
  })
})

//Render Login
router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login", isBody: "bg-gradient-primary" });
});

router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Sign Up", isBody: "bg-gradient-primary" });
});


//Redirect homePage
router.get("/", isLoggedIn, (req, res, next) => {
  res.redirect(`/${req.session.user._id}`);
});

//Render adminPage
router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    User.find({}, (err, users) => {
      if (err) throw new Error(err);
      const results = JSON.stringify(users)
      return res.render("dashboard", {
        title: "Dashboard",
        isDash: true,
        user: req.session.user,
        data: JSON.parse(results),
        admin: (req.session.user.role).includes('Admin') ? true : false
      });
    });
      
   

  } catch (error) {
    res.status(404).send({ message: error.message });
  }
 
});

// POST REQUESTS

//Upload Menu
router.post("/menu", upload.single("file"), (req, res) => {
  const formFile = req.file;
  try {
    if (formFile.mimetype !== "application/pdf")
      return res.render("dashboard", {
        title: "Dashboard",
        errorMsg: "pdf files only",
      });
  } catch (error) {
    req.file = null;
    res.render("pages/error", { title: "Error" });
  }
  const str = req.file.metadata.replace("Menu", "");
  const metadata = str.charAt(0).toUpperCase() + str.slice(1);
  res.render("pages/success", {
    title: "Dashboard",
    user: req.session.user,
    menu: req.file.originalname,
    uploadedFile: metadata,
    isMenu: true,
  });
});

//Helper Function - Authenticated
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return !req.session.user.role ? res.redirect('/authenticate/verification') : next()
  }
  return res.redirect('login')

  // res.render('pages/verification', {title: 'Verification', isBody: 'bg-gradient-primary'})
}

//Redirect 404
router.use("*", (req, res) => {
  res.render("pages/error", { title: "Error" });
});

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
module.exports = router;
