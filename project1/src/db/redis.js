const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
    console.error(err)
});

async function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    await redisClient.connect();
    await redisClient.set(key, val);
}

async function get(key) {
    await redisClient.get(key)
}

module.exports = {
    set,
    get
}