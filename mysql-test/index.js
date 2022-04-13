const mariadb = require('mariadb/callback')
const conn = mariadb.createConnection({
    host: '192.168.88.82',
    user: 'test1',
    password: 'test123',
    port: '3306',
    database: 'testdb'
})

conn.connect(err => {
    if (err) {
        console.log("not connected due to error: " + err);
    } else {
        console.log("connected ! connection id is " + conn.threadId);
    }
});

const sql = "UPDATE users SET realname='钱六' where username='wangwu';";
const rows = conn.query(sql, (err, result) => {
    if (err) {
        console.error(err);
        conn.end();
        return;
    }
    console.log(result);
    conn.end();
});