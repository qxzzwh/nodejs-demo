const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
// function getFileContent(filename, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', filename);
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(er);
//             return;
//         }
//         callback(
//             JSON.parse(data.toString())
//         );
//     });
// }

// getFileContent('a.json', aData => {
//     console.log('a Data', aData);
//     getFileContent(aData.next, bData => {
//         console.log('b data', bData);
//         getFileContent(bData.next, cData => {
//             console.log('c data', cData);
//         })
//     })
// })

function getFileContent(filename) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', filename);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(
                JSON.parse(data.toString())
            );
        });
    })

    return promise;
}

// getFileContent('a.json').then(aData => {
//     console.log('a data', aData);
//     return getFileContent(aData.next);
// }).then(bData => {
//     console.log('b data', bData);
//     return getFileContent(bData.next);
// }).then(cData => {
//     console.log('c data', cData);
// })

async function readFileData() {
    const aData = await getFileContent('a.json')
    console.log(aData)
    const bData = await getFileContent('b.json')
    console.log(bData)
    const cData = await getFileContent('c.json')
    console.log(cData)
}

readFileData()