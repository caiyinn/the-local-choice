var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import cors
var cors = require('cors');

require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
const storeRouter = require('./routes/stores');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orderRoutes');

var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
// Set up CORS to allow React app to make requests to this API
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/config/stores', storeRouter);
app.use('/', productRouter);
app.use('/orders', orderRouter);

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
