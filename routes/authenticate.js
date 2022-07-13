const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../modules/User")
const nodemailer = require('nodemailer')
require('dotenv').config()



// GET REQUESTS
router.get("/login", (req, res) => {
  res.redirect("/")
})
router.get("/logout", (req, res) => {
  res.redirect("/")
})
router.get("/verification", (req, res) => {
  res.render("pages/verification", { title: "Verification", isBody: "bg-gradient-primary" });
});

router.post('/verification', async (req, res) => {
    try {
      const verificationCode = req.body.verificationCode
      const currentUser = req.session.user
      if (currentUser._id !== verificationCode) return res.render('pages/verification', {title: 'Verification', isBody: 'bg-gradient-primary', errorMsg: 'Incorrect Code'})
      req.session.user.role = 'Admin'
      await User.updateOne({ _id: currentUser._id }, { role: req.session.user.role}) 
      return res.status(200).redirect(`/${currentUser._id}`)
  } catch (error) {
    return res.status(404).render('pages/register', {title: 'Sign Up', isBody: 'bg-gradient-primary', errorMsg: 'cannot register at this time'})
  }
})

router.post("/register", async (req, res) => {
  const USER_EMAIL = process.env.USER_EMAIL;
  const USER_PASS = process.env.USER_PASS;
  const currentUser = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(currentUser.rePassword, salt)
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_EMAIL,
        pass: USER_PASS.toString()         
    },
    from: USER_EMAIL, 
    tls: {
        rejectUnauthorized: false
      }
    });
  
  try {
    const findUser = await User.findOne({username: currentUser.email})
    if (findUser)  return res.render('pages/register', {title: 'Sign Up', isBody: 'bg-gradient-primary', errorMsg: `user already exists`})
    if (currentUser.password !== currentUser.rePassword) return res.render('pages/register', {title: 'Sign Up', errorMsg: 'Passwords do not match', isBody: 'bg-gradient-primary'})
    const response = new User({...currentUser, username: currentUser.email, password: hashedPassword})
    await response.save()
    .then((data) => {
      req.session.user = data
    })
    .catch((e) => {
      return res.status(404).render('pages/register', {title: 'Sign Up', isBody: 'bg-gradient-primary', errorMsg: `Server error: ${e.message}`})
    })
    
    // Send verification code to admin
       const host = req.get('host')
       const url = host.includes('local') ? "http://" : "https://" 
       const link = url + host + '/' + req.session.user._id
       const mailOptions = {
            from: USER_EMAIL,
            to: currentUser.email,
            subject: `Verify Account - ${req.session.user.username}`,
            html: `
              <h2>${req.session.user.firstName} ${req.session.user.lastName} has been registered</h2>
              <h3>Your username is ${(req.session.user.username)}</h3>
              <h4>Verification code has been sent to Sina</h4>
              <a href="${link}">
                  <h6>Verify your account</h6>
                </a>
            ` 
          }
        const verificationEmail = {
          from: USER_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: `Verification Code - ${req.session.user.username}`,
          html: `
            <h3>${req.session.user.firstName} ${req.session.user.lastName} has registered</h3>
            <h5>Verification code: ${req.session.user._id}</h5>
          ` 
        }
        transporter.sendMail(mailOptions)
        transporter.sendMail(verificationEmail)

        return res.redirect(`/${req.session.user._id}`)
    } catch (error) {
          return res.render('pages/register', {title: 'Sign Up', isBody: 'bg-gradient-primary', errorMsg: `cannot register user`})
     }
    })

// POST REQUESTS
router.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username === "" || password === "")
    return res.render("pages/login", {
      title: "Login",
      errorMsg: "Missing credentials",
      isBody: 'bg-gradient-primary'
    })
  User.findOne({ username: username }, (err, user) => {
    try {
      if (err) throw new Error(err)
      if (!user)
        return res.render("pages/login", {
          title: "Login",
          errorMsg: "invalid username",
          isBody: 'bg-gradient-primary'
        })
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          try {
            if (err) throw new Error(err)
            if (isMatch) {
              req.session.user = user
              res.redirect(`/${req.session.user._id}`)
            } else {
              res.render("pages/login", {
                title: "Login",
                errorMsg: "invalid password",
                isBody: 'bg-gradient-primary'
              })
            }
          } catch (error) {
            res.json({ message: error.message })
          }
        })
      }
    } catch (error) {
      res.json({ message: error.message })
    }
  })
})

router.post("/logout", (req, res) => {
  req.session.reset()
  res.redirect("login")
})

module.exports = router
