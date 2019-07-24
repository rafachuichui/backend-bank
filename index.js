'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mysqlPool = require('./database/db');
const userRouter = require('./routes/users');
const bankRouter = require('./routes/banks');

//Initializations
const app = express();

//Settings
app.use(cors());
app.use(bodyParser.json());


process.on('uncaughtException', (error) => {
    console.error(`uncaughtException: ${error}`);
});
process.on('unhandledRejection', (error) => {
    console.error(`unhandledRejection: ${error}`);
});


//Routes
app.use(bankRouter);
app.use(userRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send({
        error: `Body parser: ${err.message}`,
    });
});
app.use((err, req, res, next) => {
    const { name: errorName } = err;

    if (errorName === 'AccountNotActivatedError') {
        return res.status(403).send({
            message: err.message,
        });
    }

    return res.status(500).send({
        error: err.message,
    });
});

async function init() {
    try {
        await mysqlPool.connect();

        //Init server
        app.listen(process.env.PORT, () => {
            console.log(`The backend server is running in ${process.env.PORT}. Have a nice day`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

init();


//heroku no funciona