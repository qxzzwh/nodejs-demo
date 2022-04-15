const mariadb = require('mariadb');
const { MYSQL_CONF } = require('../conf/db');
// const sql = "UPDATE users SET realname='钱六' where username='wangwu';";
async function exec_sql(sql) {

    const conn = await mariadb.createConnection(MYSQL_CONF);

    try {
        const result = await conn.query(sql);
        return result;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    exec_sql
}