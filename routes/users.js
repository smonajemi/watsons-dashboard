var express = require('express');
var router = express.Router();
const User = require('../modules/User')
const bcrypt = require('bcrypt');
/* GET users listing. */
const saltRounds = 10; 

router.post('/', (req, res) => {
const password = req.body.password
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return res.send({err})
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.send({err})
      const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        password: hash
      })
      newUser.save().then(data => {
        res.json(data)
      }).catch(e => {
        res.json({message: e})
      })
    });
  });
  

});

module.exports = router;




// var express = require("express");
// var router = express.Router();
// const User = require("../modules/User");
// const bcrypt = require('bcrypt');
// /* GET users listing. */

// router.post("/", (req, res) => {
//   bcrypt.hash(req.body.password, salt, (err, hash) => {
//     if (err) return next(err);
//     const newUser = new User({
//       username: req.body.username,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       role: req.body.role,
//       password: hash,
//     });
//     newUser
//       .save()
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((e) => {
//         res.json({ message: e });
//       });
//   });
// });
// module.exports = router;

