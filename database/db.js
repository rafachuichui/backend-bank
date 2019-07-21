// FIRST CONNECTION
const mysql = require('mysql2');
// const mysqlPool = require('../database');



async function connect() {
    const options = {
        connectionLimit: 10,
        host: '127.0.0.1',
        user: "hackabos",
        password: "password",
        database: "bank_of_banks",
        port: 3306,
        timezone: 'Z',
        // debug: true,
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




//SECOND CONNECTION
// const mysql = require('mysql2');
// const mysqlPool = require('../model/database');
// const pool = mysql.createPool(database);


// pool.getConnection(err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('DATABASE CONNECTION WAS CLOSED');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('DATABASE CONNECTION WAS CLOSED');
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('DATABASE CONNECTION WAS REFUSED');
//         }
//     }
//     if (connection) connection.release();
//     console.log('DATABASE IS CONECTED')
//     return;
// }


// //Promisify Pool Querys
// pool.query = promisify(pool.query);

//module.exports = pool;






// //THIRD CONNECTION
// const Sequelize = require("sequelize");
// const db = {};
// const sequelize = new Sequelize("bank_of_banks", "hackabos", "password", {
//     host: "127.0.0.1",
//     dialect: "mysql",
//     operatorsAliases: false,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })



// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;