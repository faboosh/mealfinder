const mysql = require('mysql');

module.exports = mysql.createConnection({
    socketPath: '/home/fabianjohansson/.config/Local/run/cEh6oMlMn/mysqld.sock',
    user: 'root',
    password: 'root',
    database: 'restaurants',
    debug: false,
});