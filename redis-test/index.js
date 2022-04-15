const redis = require('redis');
// (async () => {
//     const client = redis.createClient();

//     client.on('error', (err) => console.log('Redis Client Error', err));

//     await client.connect();

//     await client.set('key', 'value');
//     const value = await client.get('key');
//     console.log('myname ', value);
//     await client.quit();
// })();

const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', err => {
    console.error(err)
});
redisClient.connect().then(() => {
    redisClient.set('myname2', 'zhangsan2', redis.print)
        .then(() => {
            redisClient.get('myname')
                .then(val => {
                    console.log('val ', val)
			 redisClient.quit()
                })
                .catch(err => {
                    console.log(err)
                    // return
                });
        })
        .catch(err => {
            console.log(err)
        })
})
// redisClient.quit()
