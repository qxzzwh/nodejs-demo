const { exec_sql } = require('../db/mysql.js');
const login = (username, password) => {
    const sql = `select username, realname from users where username='${username}' and password='${password}';`
    return exec_sql(sql).then(rows => {
        return rows[0] || {};
    })
}

module.exports = { login }

