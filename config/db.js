const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",    // env
    user: "root",
    password: "nagoor",
    database: "urlservicedb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();