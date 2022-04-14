const { exec_sql } = require('../db/mysql.js');
const { genPassword } = require('../utils/crypt')
const sqlString = require('sqlstring')
const login = (username, password) => {
    username = sqlString.escape(username);

    password = genPassword(password)
    password = sqlString.escape(password);
    const sql = `select username, realname from users where username=${username} and password=${password};`
    return exec_sql(sql).then(rows => {
        return rows[0] || {};
    })
}

module.exports = { login }

