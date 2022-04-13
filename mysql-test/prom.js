const mariadb = require('mariadb')
const sql = "UPDATE users SET realname='钱六' where username='wangwu';";
mariadb.createConnection({
    host: '192.168.88.82',
    user: 'test1',
    password: 'test123',
    port: '3306',
    database: 'testdb'
})
    .then(conn => {
        conn.query(sql)
            .then(rows => {
                console.log(rows);
                conn.end();
            })
            .catch(err => {
                console.error(err);
                conn.end();
                return;
            });
    })
    .catch(err => {
        console.error(err);
        conn.end();
        return;
    });