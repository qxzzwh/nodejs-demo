const http = require('http')
const server = http.createServer((req, res) => {
    console.log('Current time:', Date.now())
    console.error('error', Date.now())

    //simulate an error
    if (req.url === '/err') {
        throw new Error('/err something wrong')
    }
    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            errno: 0,
            msg: 'pm2 test sever 3'

        })
    )
})

server.listen(8000)
console.log('server is listening on port 8000...')