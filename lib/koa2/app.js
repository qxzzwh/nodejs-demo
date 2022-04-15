const Koa = require('./like-koa2');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    console.log('fisrt layer start')
    await next();
    const rt = ctx['X-Response-Time'];
    console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
    console.log('fisrt layer end')
});

// x-response-time

app.use(async (ctx, next) => {
    console.log('second layer start')
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx['X-Response-Time'] = `${ms}ms`;
    console.log('second layer end')
});

// response

app.use(async ctx => {
    console.log('third layer start')
    ctx.res.end('This is like koa2');
    console.log('third layer start')
});

app.listen(3000);