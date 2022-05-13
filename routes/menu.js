var express = require('express');
var router = express.Router();
const Menu = require('../modules/Menu')
const upload = require('../middlewares/upload')
/* GET menu */
router.get('/', function(req, res, next) {
  res.send('You are on menu');
});
router.post('/', upload.single('file'), (req, res) => {
  const newMenu = new Menu({
    name: req.file.filename,
    description: req.file.fieldname,
    file: req.file.path
  })

  newMenu.save().then(data => {
    res.redirect('/')
  }).catch(e => {
    res.json({message: e})
  })
});
// router.post('/', upload.single('file'), (req, res) => {
//   console.log(req.file)
//   res.send('uploaded')
// })

module.exports = router;
