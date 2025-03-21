const express = require('express')
const path = require('path')
const app = express()
const expbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const clientSessions = require('client-sessions')
const connectDB = require("./db/connection")
const authenticationRouter = require('./routes/authenticate')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const pdfUploadRouter = require('./routes/uploadRouter')
const hbs = require('hbs');
const http = require("http")
const HTTP_PORT = process.env.PORT || 3000
const crypto = require('crypto')
const bodyParser = require("body-parser")
require('dotenv').config()
connectDB()
http.createServer(app).listen(HTTP_PORT, onHttpStart)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(crypto.randomBytes(25000).toString("hex")))
app.use(express.static(path.join(__dirname, 'public')))
app.use(clientSessions({
  cookieName: "session", 
  secret: crypto.randomBytes(25000).toString("hex"), 
  duration: 60 * 60 * 1000, // (60 minutes)
  activeDuration: 5 * 60 * 1000 // Extended by 5 minutes on each request
}));

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Get Routers
app.use('/authenticate', authenticationRouter)
app.use('/users', usersRouter)
app.use("/upload", pdfUploadRouter);
app.use('/', indexRouter)


// view engine setup
app.engine('.hbs', expbs.engine({ 
  extname: '.hbs',
  defaultLayout: 'dashboard',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    increment: function(value) {
      return value + 1;
    }
  }
}));

app.set('view engine', 'hbs');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('pages/error', {title: "Error"})
})

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('pages/error', {title: "Error"})
})


// Helper functions
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT)
}

module.exports = app
