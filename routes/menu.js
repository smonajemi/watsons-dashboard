var express = require("express");
var router = express.Router();
const Menu = require("../modules/Menu");
const upload = require("../middlewares/upload");
const path = require("path");
let exit = Boolean(false);

/* GET menu */
router.get("/", (req, res, next) => {
  next()
});

router.post("/", upload.single("file"), async (req, res, next) => {
  if (req.file) {
    const newMenu = new Menu({
      name: req.file.filename,
      description: req.file.originalname,
      file: req.file.path,
    });
    try {
      await newMenu.save();
      res.status(200).redirect('http://localhost:3000/menu')
    } catch (error) {
      res.status(404).json(error);
    }
  }
});

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', 'https://young-dawn-06072.herokuapp.com');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
      return res.status(200).json({});
  }
  next();
});


module.exports = router;
