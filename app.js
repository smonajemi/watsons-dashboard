const express = require('express');
const path = require('path');
const app = express();
const expbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require("./db/connection");
const authenticationRouter = require('./routes/authenticate')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const http = require("http");
const https = require("https");
const HTTP_PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.PORT_HTTPS
const clientSessions = require('client-sessions')

require('dotenv').config()
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(app).listen(HTTPS_PORT, onHttpsStart);

app.use(cookieParser('secretWord'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "secretWord", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get Routers

app.use('/authenticate', authenticationRouter)
app.use('/users', usersRouter)
app.use('/', indexRouter)
app.use('/uploads', express.static('uploads'))

// Connect MongoDB - Database
connectDB()




// view engine setup
app.engine('.hbs', expbs.engine({ extname: '.hbs',
defaultLayout: 'dashboard',
layoutsDir: path.join(__dirname, 'views/layouts'),
partialsDir: __dirname + '/views/partials'
 }))
app.set('view engine', 'hbs');


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.redirect('/')
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})



function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
function onHttpsStart() {
  console.log("Express https server listening on: " + HTTPS_PORT);
}

module.exports = app;
