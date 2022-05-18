var express = require("express");
var router = express.Router();
const Menu = require("../modules/Menu");
const upload = require("../middlewares/upload");
const fs = require('fs-extra')
const path = require('path')
require('dotenv/config')
/* GET menu */
router.get("/", (req, res, next) => {
  next()
});

router.post("/", upload.single("file"), async (req, res, next) => {
  if (req.file) {
    const newMenu = new Menu({
      name: req.file.filename,
      description: "Watson's Toronto Menu - QR Code",
      file: req.file.path,
    });
    try {
      newMenu.save();
    } catch (error) {
      res.status(404).send(error);
    }
  }
  const formFile = req.file;
  const dataReceived = "Your submission was successful:<br/><br/>" +
     "You uploaded: " + JSON.stringify(formFile) +
     `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a>` +
     `<br/><br/><a class="btn" href="/menu" target="_blank"><button>View Uploaded Menu</button></a>`
    res.send(dataReceived);
});

// router.use((req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
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
