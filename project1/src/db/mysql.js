const mariadb = require('mariadb');
const { MYSQL_CONF } = require('../conf/db');
// const sql = "UPDATE users SET realname='钱六' where username='wangwu';";
function exec_sql(sql) {
    return new Promise((resolve, reject) => {
        mariadb.createConnection(MYSQL_CONF)
            .then(conn => {
                conn.query(sql)
                    .then(rows => {
                        resolve(rows);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    })
}

module.exports = {
    exec_sql
}