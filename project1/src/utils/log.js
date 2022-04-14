const fs = require('fs')
const path = require('path')
const f1 = path.resolve(__dirname, 'data1.txt')
function createWriteStream(fileName) {
    const fullName = path.resolve(__dirname, '../', '../', 'log', fileName)
    const writeStream = fs.createWriteStream(fullName, {
        flags: 'a'
    })
    return writeStream
}
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}