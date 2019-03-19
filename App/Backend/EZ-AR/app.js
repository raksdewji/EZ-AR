var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// connect with PostgresSQL
var pg = require('pg');

// Database config
var config = {
  user:"postgres",
  database:"postgres",
  password:"ezar",
  host: 'localhost',
  port:1234,

  // extended attributes
  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000
}

var pool = new pg.Pool(config);


pool.connect(function (isErr, client, done) {
  if (isErr) {
    console.log('connect query:' + isErr.message);
    return;
  }
  client.query('select now();', [], function (isErr, rst) {
    done();
    if (isErr) {
      console.log('query error:' + isErr.message);
    } else {
      console.log('query success, data is: ' + rst.rows[0].now);
    }
  })
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
