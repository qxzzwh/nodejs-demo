// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//     if (req.method = 'POST') {
//         req.pipe(res)
//     }
// })
// server.listen(8000)

// const fs = require('fs')
// const path = require('path')
// const f1 = path.resolve(__dirname, 'data1.txt')
// const f2 = path.resolve(__dirname, 'data2.txt')
// const readstream = fs.createReadStream(f1)
// const writestream = fs.createWriteStream(f2)
// readstream.pipe(writestream)
// readstream.on('data', (chunk) => {
//     console.log(chunk.toString())
// })
// readstream.on('end', () => {
//     console.log('copy done')
// })

const http = require('http')
const fs = require('fs')
const path = require('path')
const f1 = path.resolve(__dirname, 'data1.txt')
const server = http.createServer((req, res) => {
    if (req.method = 'GET') {
        const readstream = fs.createReadStream(f1)
        readstream.pipe(res)

    }
})
server.listen(8000)