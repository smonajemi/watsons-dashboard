var express = require('express')
var router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../modules/User')

// GET REQUESTS
router.get("/login", (req, res) => {
  res.render('login', {title: 'Login'})
})
router.get("/logout", (req, res) => {
  res.redirect('/')
})

// POST REQUESTS
router.post("/login", (req,res) => {
    const username = req.body.username
    const password = req.body.password
    if (username === "" || password === "") return res.render('/login', {title: "Login", errorMsg: "Missing credentials"})
    User.findOne({ username: username }, (err, user) => {
    try {
      if (err) throw new Error(err)
      if (!user) done(null, false)
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            try {
        
                if (err) throw new Error(err)
                if (isMatch) {
                  req.session.user = user
                  res.redirect(`/dashboard/${req.session.user._id.toString()}`)
                } else {
                  res.render('login', {title: 'login', errorMsg: "invalid username or password"})
                }
            } catch (error) {
                res.json({message: error.message})
            }
        })
      }
    } catch (error) {
      res.json({message: error.message})
    }
  })
  
})

router.post('/logout', (req, res) => {
  req.session.reset()
  res.redirect('login')
})

module.exports = router
