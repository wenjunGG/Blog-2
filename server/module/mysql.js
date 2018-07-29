const mysql = require('mysql');

module.exports = function (sqlstr,value,callback) {
    const config = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        part: '3306',
        database: 'node'
    })
    config.connect();
    config.query(sqlstr,value,callback);
    config.end();
}