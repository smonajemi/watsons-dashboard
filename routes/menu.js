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
      await newMenu.save();
      const options = {
        root: path.join(__dirname.replace('routes', 'uploads'))
    };
    const fileName = 'watsonsToronto.pdf';
    res.status(200).sendFile(fileName, options, (err) => {
        err ? next(err) : next()
    });
    } catch (error) {
      res.status(404).send(error);
    }
  } else return res.redirect('/')

});

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', process.env.HOST_DEV);
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
      return res.status(200).json({});
  }
  next();
});


module.exports = router;
