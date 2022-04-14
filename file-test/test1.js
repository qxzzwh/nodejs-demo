const fs = require('fs')
const path = require('path')
const filename = path.resolve(__dirname, 'data.txt')
//read file
// fs.readFile(filename, (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data.toString())
// })
// const content = "this is the content."
// const opt = {
//     flag: 'a'
// }
// fs.writeFile(filename, content, opt, (err) => {
//     if (err) {
//         console.error(err)
//         return
//     }
// })
// fs.access(filename, fs.constants.F_OK, (err) => {
//     console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
// });