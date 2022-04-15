const http = require('http')
const slice = Array.prototype.slice
class LikeExpress {
    constructor() {
        // 存放中间件
        this.routes = {
            all: [], //app.use(...)
            get: [], //app.get(...)
            post: [] //app.post(...)
        }
    }

    register(path) {
        const info = {}
        if (typeof path === 'string') {
            info.path = path
            //从第二个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 1) //数组
        } else {
            info.path = '/'
            //从第一个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 0) //数组
        }
        return info
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }
    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }
    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }
    match(method, url) {
        let stack = []
        if (url === '/favicon.ico') {
            return stack
        }
        // 获取 routes
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])
        console.log(curRoutes)
        curRoutes.forEach(routeInfo => {
            // console.log(url.indexOf(routeInfo.path))
            if (url.indexOf(routeInfo.path) === 0) {
                //url === '/apt/get-cookie' and routeInfor.path = '/'
                //url === '/apt/get-cookie' and routeInfor.path = '/'api
                //url === '/apt/get-cookie' and routeInfor.path = '/'api/get-cookie
                stack = stack.concat(routeInfo.stack)
                // console.log(stack)
            }
        })
        return stack
    }

    //核心next机制
    handle(req, res, stack) {
        // console.log(stack)
        const next = () => {
            const middleware = stack.shift()
            if (middleware) {
                //执行中间件
                middleware(req, res, next)
            }
        }
        next()
    }
    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }
            const url = req.url
            // console.log(url)
            const method = req.method.toLowerCase()
            // const method = req.method
            // console.log(method)
            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

//工厂函数
module.exports = () => {
    return new LikeExpress()
}