'use strict';

const mysql = require('mysql2');


/////////////////////////////////////////// FIRST CONNECTION
async function connect() {
    const options = {
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        timezone: 'Z',
        //debug: true,
        multipleStatements: true,
    };

    /**
     * Create connection pool and
     * promisify it to use async / await
     */
    const pool = mysql.createPool(options);
    this.pool = pool.promise();

    try {
        const connection = await this.pool.getConnection();
        if (connection) {
            connection.release();
        }
    } catch (e) {
        console.error('DATABASE IS CONNECTED', e);
        throw e;
    }
}

async function getConnection() {
    if (this.pool === null) {
        throw new Error("MySQL connection didn't established. You must connect first.");
    }

    const connection = await this.pool.getConnection();

    return connection;
}

module.exports = {
    connect,
    getConnection,
};



