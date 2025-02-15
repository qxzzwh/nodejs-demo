const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const morgan = require('koa-morgan');
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const path = require('path');
const fs = require('fs');

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
const ENV = process.env.NODE_ENV;

if (ENV != 'production') {
  app.use(morgan('dev', {
    stream: process.stdout
  }));
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, { flags: 'a' });
  app.use(morgan('combined', {
    stream: writeStream
  }));
}


//session
app.keys = ['Af56_nge21B']
app.use(session({
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  }),
  cookie: {
    path: '/', //default
    httpOnly: true, //default
    maxAge: 24 * 60 * 60 * 1000
  }
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
