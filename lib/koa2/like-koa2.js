const http = require('http')
//组合中间件
function compose(middlewareList) {
    return function (ctx) {
        //中间件调用
        function dispatch(i) {
            const fn = middlewareList[i]
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))
                )

            } catch (error) {
                return Promise.reject(error)
            }
        }
        return dispatch(0)
    }


}

class LikeKoa2 {
    constructor() {
        this.middlewareList = []
    }
    use(fn) {
        this.middlewareList.push(fn)
        return this
    }

    createContext(req, res) {
        const ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx
    }

    handlRequest(ctx, fn) {
        return fn(ctx)
    }
    callback() {
        const fn = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handlRequest(ctx, fn)

        }
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = LikeKoa2