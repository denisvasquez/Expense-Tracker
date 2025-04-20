const mysql = require('mysql2');
const util = require('util');

const credentials = {
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
}

const pool = mysql.createPool({ ...credentials, connectionLimit: 10 });

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) {
        connection.release();
        console.log('DB is connected');
    }

    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;