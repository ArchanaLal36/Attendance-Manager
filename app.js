var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
//database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test", function (err) {
    if(err){
        console.error("Error "+ err);
    }
});
//routes
var index = require('./routes/home/index');
var login = require('./routes/users/login');
var leave = require('./routes/leaveform/leaveform');
var od = require('./routes/odform/odform');
var staff = require('./routes/staff/staff');
//
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'anystringoftext',
                saveUninitialised: true,
                resave: true
            }));

//
app.use('/student', index);
app.use('/', login);
app.use('/leave',leave);
app.use('/od',od);
app.use('/staffs',staff);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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