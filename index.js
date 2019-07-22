'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');//Para poder ver mensajes
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
//const router = require('./routes');
const mysqlPool = require('./database/db');



//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));


//middelwares
// app.use(session({
//     secret: 'banksmysqlnodesession',
//     resave: false,
//     store: new MySQLStore(mysqlPool)
// }));

app.set(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(flash());

//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});


//Routes
app.use(require('./routes/index-routes'));
app.use(require('./routes/authentication'));
app.use('/banks', require('./routes/banks'));
//app.use('/api', router.accountRouter);
//app.use('/api', router.managementRoutes);



const users = require("./routes/users");
//app.use("/users", users);
//app.use('/users', require('./routes/users'));



//Public
app.use(express.static(path.join(__dirname, 'public')));

//transferMoney
//router.get('/api/transfer', transferMoneyRoutes);

//transferMoney
//router.get('/transfer', transferMoneyController);

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
    } catch (e) {
        console.error(e);
        process.exit(1);
    }


    //Init server

    app.listen(process.env.PORT, () => {
        console.log(`The backend server is running in ${process.env.PORT}. Have a nice day`);
    });

}

init();
