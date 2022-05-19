var express = require('express');
var router = express.Router();
const User = require('../modules/User')
/* GET users listing. */

router.post('/', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    password: req.body.password
  })
  newUser.save().then(data => {
    res.json(data)
  }).catch(e => {
    res.json({message: e})
  })
});

module.exports = router;
