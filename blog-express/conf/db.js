const env = process.env.NODE_ENV;
let MYSQL_CONF;
let REDIS_CONF;
if (env === 'dev') {
    MYSQL_CONF = {
        host: '192.168.88.82',
        user: 'test1',
        password: 'test123',
        port: '3306',
        database: 'testdb',
        insertIdAsNumber: true,
        bigIntAsNumber: true
    },
        REDIS_CONF = {
            port: '6379',
            host: '127.0.0.1'
        }
}
// if (env === 'dev') {
//     REDIS_CONF = {
//         port: '6379',
//         host: '127.0.0.1'
//     }
// }
if (env === 'production') {
    MYSQL_CONF = {
        host: '192.168.88.82',
        user: 'test1',
        password: 'test123',
        port: '3306',
        database: 'testdb',
        insertIdAsNumber: true,
        bigIntAsNumber: true
    },
        REDIS_CONF = {
            port: '6379',
            host: '127.0.0.1'
        }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}