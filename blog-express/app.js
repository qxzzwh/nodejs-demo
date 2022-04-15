var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const redis = require('redis')
const session = require('express-session');
let RedisStore = require('connect-redis')(session);

// const redisClient = require('./db/redis');
const { REDIS_CONF } = require('./conf/db');
const redisClient = redis.createClient(
  {
    port: REDIS_CONF.port,
    host: REDIS_CONF.host,
    legacyMode: true
  });
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  logErrors: true
});
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
const { createWriteStream } = require('fs');

var app = express();
app.set('trust proxy', 1);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV;

if (ENV != 'production') {
  app.use(logger('dev', {
    stream: process.stdout
  }));
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, { flags: 'a' });
  app.use(logger('combined', {
    stream: writeStream
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'Af56_nge21B',
  resave: true,
  saveUninitialized: true,
  store: redisStore,
  cookie: {
    // path: '/', //default
    // httpOnly: true, //default
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
