const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expbs = require('express-handlebars');
const connectDB = require("./db/connection");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const menuRouter = require('./routes/menu')
const app = express();
const http = require("http");
const https = require("https");
require('dotenv').config()
const HTTP_PORT = process.env.HTTP-PORT || 3000;
const HTTPS_PORT = process.env.HTTPS-PORT || 3000;
// const https = require('https')
// require('dotenv').config()
// const HTTP_PORT = process.env.HTTP_PORT || 3000;
// const HTTPS_PORT = process.env.PORT || 4433;
// const ASSETS = "./assets/";
// const SSL_KEY_FILE = ASSETS + "server.key";
// const SSL_CRT_FILE = ASSETS + "server.crt";
// const https_options = {
//     key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
//     cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
// };
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(app).listen(HTTP_PORT, onHttpsStart);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.engine('.hbs', expbs.engine({ extname: '.hbs',
defaultLayout: 'dashboard',
layoutsDir: path.join(__dirname, 'views/layouts'),
partialsDir: __dirname + '/views/partials'
 }));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/menu', menuRouter);
app.use('/uploads', express.static('uploads'))
connectDB()
// catch 404 and forward to error handler
app.use((req, res, next) => {
  var reqType = req.headers["x-forwarded-proto"];
  reqType == 'https' ? next() : res.redirect("https://" + req.headers.host + req.url);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
function onHttpsStart() {
  console.log("Express https server listening on: " + HTTP_PORT);
}

module.exports = app;
