var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt');
const path = require("path")
const Menu = require("../modules/Menu")
const User = require('../modules/User')
const upload = require("../middlewares/upload")
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const session = require('cookie-session')
require('dotenv/config')

router.use(session({
  secret: 'secretWord',
  resave: false,
  saveUninitialized: true 
}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user,done) => {
  done(null,user);
});
passport.deserializeUser((id,done) => {
  User.findById(id, (err,user) => {
      done(err,user);
  })
});

passport.use(new localStrategy( async (username, password, done) => {
  User.findOne({username:username}, (err,user) => {
      // if(err) return done(err);
      // // return !user ? done(null, false) : done(null, user)
      // bcrypt.compare(password, user.password, (err, isMatch) => {
      //   if (err) {
      //     return cb(err);
      //   }
      //   cb(null, isMatch);
      // });
      try {
          if (err) throw new Error(err)
          if (!user) done(null, false)  
          if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw new Error(err)
              isMatch ? done(null, user) : done(null, false)
            })
          }
      } catch (error) {
        done(error)
      }
  })
}));

// GET REQUESTS
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('dashboard', { title:"Dashboard", isDash: true})
})

router.get('/users', function(req, res, next) {
  res.send('You are on users');
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render('partials/login', { title:"Login", isLoggedIn: true})
});

router.get("/register", isLoggedIn, (req, res) => {
  res.render('partials/register', { title:"Register", isRegistered: true})
});
router.get('*', function(req, res, next) {
  res.redirect('/')
})

router.get("/menu", (req, res, next) => {
    const options = {
        root: path.join(__dirname.replace('routes', 'uploads'))
    }
    const fileName = 'watsonsToronto.pdf'
    res.status(200).sendFile(fileName, options, (err) => {
        if (err) next(err)
    })
})





// POST REQUESTS

router.post("/login", passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.post("/menu", upload.single("file"), (req, res, next) => {
  const formFile = req.file
  let dataReceived = ''
  try {
    const newMenu = new Menu({
      name: formFile.filename,
      description: "Watson's Toronto Menu - QR Code",
      file: formFile.path,
    })
    newMenu.save()
  } catch (error) {
    req.file = null
    dataReceived = "Your submission was not successful" +
    `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a><br/><br/`
    res.send(dataReceived + error)
  }
  dataReceived = "Your submission was successful" +
  `<br/><br/><a class="btn" href="/"><button>Dashboard</button></a>` + 
  "<br/><br/> You uploaded: " + JSON.stringify(formFile.originalname) +
  `<br/><br/><a class="btn" href="/menu" target="_blank"><button>View Uploaded Menu</button></a>`
  res.send(dataReceived)
  req.file = null
})


// logged functions
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
};
function isLoggedOut(req,res,next){
  console.log('inloggedout', req.body)
  if(!req.isAuthenticated()) return next();
  res.redirect('/')
 
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
