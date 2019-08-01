const express = require('express');
const router = express.Router();


const mysqlPool = require('../database/db');



/**
* Problema 1
* 1. Cada vez que se registre un usuario, la aplicación le ingrese una cantidad
* aleatoria (generar el balance en el momento de registro)
* 2. Insertar el balance actual del usuario (fijarse como es una sentencia SQL,
*  los valores string van entre comillas, etc etc)
*/
async function transferMoneyController(req, res) {
    const min = -5000;
    const max = 150000;

    const initialBalance = Math.floor(Math.random() * (max - min) + min);

    const userData = {
        // cubres los datos que sean necesarios durante el registro
    };



    const connection = await mysqlPool.getConnection();
    const result = await connection.query('INSERT INTO usersbanks SET ?', userBankData);


    //console.log(result);
    res.send('transferMoneyController');

}

/**
* Problema 2
* Tenemos un objeto en el que la clave es el nombre del banco, de forma que si hacemos
* banks['bankinter'] se obtendrán 1000 EUR
*/

async function insertBankController() {
    try {
        await mysqlPool.connect();
        console.log('connect mysql')
    } catch (e) {
        console.log(e)
        process.exit(1)
    }

    const banks = {
        'abanca': 3000,
        'ing': 400,
        'bbva': 1750,
        'bankia': 1,
        'santander': 90,
        'sabadell': 500,
        'bankinter': 1000,
        'openbank': 100000,
        'n26': 50000,
    };


    /*
     Consulta de inserción o lo que corresponda para relacionar el banco + saldo
    */

    const userBankData = {
        userid: '2',
        bankid: '90',
        money: '0',
    };

    const connection = await mysqlPool.getConnection();
    const result = await connection.query('INSERT INTO userbanks SET ?', userBankData);

    console.log(result);

    //insertBankController();



}
module.exports = router