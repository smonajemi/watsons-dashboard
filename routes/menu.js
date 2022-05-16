var express = require('express');
var router = express.Router();
const Menu = require('../modules/Menu')
const upload = require('../middlewares/upload')
const path = require('path');
let exit = Boolean(false);

/* GET menu */
router.get('/', function(req, res, next) {
  res.redirect('/dashboard')
})
router.post("/", upload.single('file'), (req, res, next) => {
  //test new post
if (req.file) {
  const newMenu = new Menu({
    name: req.file.filename,
    description: req.file.originalname,
    file: req.file.path
  })
//     newMenu.save(function(err) {
//       if (err !== null) {
//           //object was not save
//           console.log(err);
//           return res.status(404).json(err)
//               } else {
//                 exit = true
//             const dataReceived = `Your submission was received`
//             req.body = newMenu
//             return res.status(200).send(dataReceived + req.body)
//   };
// });
} 
const formData = req.body;
const formFile = req.file;
const dataReceived = "Your submission was received:<br/><br/>" +
"Your File data was:<br/>" + JSON.stringify(formFile.filename);
res.send(dataReceived);
});

/** RULES OF OUR API */
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
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
