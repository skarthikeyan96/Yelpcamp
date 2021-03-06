const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MethodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const campgroundRoute = require('./routes/campgrounds');
const commentRoute = require('./routes/comments');

//importing models
const User = require("./models/users")
const app = express();
//connecting to mongoose
mongoose.connect('mongodb://root:root123@ds054308.mlab.com:54308/yelpcamp', { useNewUrlParser: true }) // test -- db
//setting up passport 
app.use(require('express-session')({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
}))
//init the passport 
app.use(passport.initialize());
// session
app.use(passport.session());
// use the Local Strategy 
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash())
//middleware to get the current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  return next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}))
app.use(MethodOverride("_method"))
app.use('/',indexRouter);
app.use('/user', usersRouter);
app.use('/campgrounds',campgroundRoute)
app.use('/campgrounds/:id/comment',commentRoute);
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
