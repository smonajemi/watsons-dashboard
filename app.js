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
require('dotenv').config()
const HTTP_PORT = process.env.PORT || 3000;

// Creating Server
const server = http.createServer((req,res)=>{
  req.status(200)
  console.log("Server is Started")
  res.end();
})
server.listen(HTTP_PORT, 'localhost',()=>{
  console.log("Express http server listening on: " + HTTP_PORT);
})
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

module.exports = app;
