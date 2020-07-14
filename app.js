// npx express-generator redux-a-center --view=ejs
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =  require('cors')
const mongoose = require("mongoose")
const passport = require("passport")
const userJWTLoginStrategy = require("./routes/lib/passport/user-passport");


mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log("MONGO DB CONNECTED")
})
.catch((e)=> console.log(w))

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/users');
const organizationsRouter = require('./routes/items/organizations');

const app = express();

app.use(passport.initialize())
passport.use("jwt-user", userJWTLoginStrategy);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orgs', organizationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
