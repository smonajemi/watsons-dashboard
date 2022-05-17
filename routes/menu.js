var express = require("express");
var router = express.Router();
const Menu = require("../modules/Menu");
const upload = require("../middlewares/upload");
const path = require("path");
let exit = Boolean(false);

/* GET menu */
router.get("/", (req, res, next) => {
  const options = {
    root: path.join(__dirname.replace("routes", "uploads")),
  };
  const fileName = "watsonsToronto.pdf";
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.post("/", upload.single("file"), async (req, res, next) => {
  if (req.file) {
    const newMenu = new Menu({
      name: req.file.filename,
      description: req.file.originalname,
      file: req.file.path,
    });
    try {
      newMenu.save();
      const options = {
        root: path.join(__dirname.replace("routes", "uploads")),
      };
      const fileName = "watsonsToronto.pdf";
      res.sendFile(fileName, options, (err) => {
        if (err) {
          next(err);
        } else {
          console.log("Sent:", fileName);
        }
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }
});



module.exports = router;
