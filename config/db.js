const mysql = require("mysql2");

const pool = mysql.createPool({
    host:process.env.HOST,    // env
    user:process.env.USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASENAME ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();