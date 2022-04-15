const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');
const redisClient = redis.createClient(
    {
        port: REDIS_CONF.port,
        host: REDIS_CONF.host,
        legacyMode: true
    });
redisClient.on('error', function (err) {
    console.error(err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
redisClient.connect().catch(console.error);

// redisClient.connect().then(() => {
//     redisClient.set('myname3', 'zhangsan3', redis.print)
//         .then(() => {
//             redisClient.get('myname3')
//                 .then(val => {
//                     console.log('val ', val)
//                     redisClient.quit()
//                 })
//                 .catch(err => {
//                     console.log(err)
//                     // return
//                 });
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })
// module.exports = {
//     redisClient
// }