const express = require('./like-express')

//本次http请求的实例
const app = express()
app.use((req, res, next) => {
    console.log('request starting...', req.method, req.url)
    next()
})
app.use((req, res, next) => {
    // presume cookie
    req.cookies = {
        userId: 'abc123'
    }
    next()
})
app.use((req, res, next) => {
    // presume post data
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })

})

app.use('/api', (req, res, next) => {
    console.log('processing /api router')
    next()
})
app.get('/api', (req, res, next) => {
    console.log('get /api router')
    next()
})

app.post('/api', (req, res, next) => {
    console.log('post /api router')
    next()
})
//simulate login check
function loginCheck(req, res, next) {

    setTimeout(() => {
        console.log('simulate login failed!')
        res.json({
            errno: -1,
            msg: 'login failed!'
        })
        // console.log('simulate login sucess')
        // next()
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookies
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('get /api/get-post-data')
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('processing 404')
    res.json({
        errno: -1,
        msg: '404 not found'
    })

})

app.listen(3001, () => {
    console.log('server is running on port 3001')
})