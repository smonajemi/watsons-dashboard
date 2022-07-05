var express = require('express')
var router = express.Router()
const path = require("path")
require('dotenv/config')

// GET REQUESTS
router.get('/', isLoggedIn, (req, res, next) => {
  res.redirect('/dashboard')
})

router.get("/login", (req, res) => {
  res.render('login', { title: "Login", isLoggedIn: true })
});

router.get("/menu", (req, res, next) => {
  const options = {
    root: path.join(__dirname.replace('routes', 'uploads'))
  }
  const fileName = process.env.UPLOADED_FILENAME
  console.log(fileName)
  res.status(200).sendFile(fileName, options, (err) => {
    if (err) next(err)
  })
})

// logged functions
function isLoggedIn(req, res, next) {
  if (!req.session.user) res.redirect('/login')
    else next()
};

// /** RULES OF OUR API */
// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
//       res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//       return res.status(200).json({});
//   }
//   next();
// });
module.exports = router
