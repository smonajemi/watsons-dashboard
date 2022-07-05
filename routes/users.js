var express = require('express');
var router = express.Router();
const User = require('../modules/User')
const user = require('./users')
const bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {
  try {
    if (!user) throw new Error("No users found")
    User.find({}, (err, users) => {
      if (err) throw new Error(err)
      const results = { users: users }
      res.status(200).json(results)
    });

  } catch (error) {
    res.status(404).send({ message: error.message })
  }
});

router.post('/', async (req, res) => {
  const newUser = new User(req.body)
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.save().then((data) => res.status(201).send(data)).catch(e => {
        res.json({message: e})
      });
})

router.post('/:userId', isLoggedIn, (req, res, next) => {
  const params = req.params
  const newPassword = req.body.newPassword
  const repeatedPassword = req.body.repeatedPassword
  User.findOne({ _id: params.userId }, (err, user) => {
    try {
      if (err || !user) throw new Error(`User not found`)
      bcrypt.hash(repeatedPassword, 10, (err, hash) => {
        try {
          if (err) throw new Error(err)
          if (newPassword != repeatedPassword)
            return res.render('partials/passwordModal', {title: "Dashboard", errorMsg: "Passwords do not match", user: req.session.user})
        
            user.password = hash
            user.save((err, user) => {
            if (err) throw new Error(err)
            res.status(200).redirect('/')
          })
        } catch (error) {
          res.status(400).send({ message: error.message })
        }
      })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })
})
function isLoggedIn(req, res, next) {
  if (!req.session.user) res.redirect('/login')
    else next()
};

module.exports = router;
