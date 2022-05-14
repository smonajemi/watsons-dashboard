var express = require('express');
var router = express.Router();
const Menu = require('../modules/Menu')
const upload = require('../middlewares/upload')
/* GET menu */
router.get('/', function(req, res, next) {
  res.render('index', { title:" Watson's Toronto", isHome: true})
});
router.post('/', upload.single('file'), (req, res) => {
  const newMenu = new Menu({
    name: req.file.filename,
    description: req.file.fieldname,
    file: req.file.path
  })

  try {
    newMenu.save()
    res.redirect('/')
  } catch (error) {
    res.json(error)
  }
});
// router.post('/', upload.single('file'), (req, res) => {
//   console.log(req.file)
//   res.send('uploaded')
// })

module.exports = router;
