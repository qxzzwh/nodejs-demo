const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
        return
    } else {
        ctx.body = new ErrorModel('Not login yet')
    }
}