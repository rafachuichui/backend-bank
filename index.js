'use strict';

//require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');//Para poder ver mensajes
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
//const router = require('./webserver/core/routes');
const mysqlPool = require('./model/database');

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));


//middelwares
app.use(session({
    secret: 'banksmysqlnodesession',
    resave: false,
    store: new MySQLStore(mysqlPool)
}));

app.set(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send({
        error: `Body parser: ${err.message}`,
    });
});
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

//Public
app.use(express.static(path.join(__dirname, 'public')));

//transferMoney
//router.get('/api/transfer', transferMoneyRoutes);



// app.use((err, req, res, next) => {
//     const { name: errorName } = err;

//     if (errorName === 'AccountNotActivatedError') {
//         return res.status(403).send({
//             message: err.message,
//         });
//     }

//     return res.status(500).send({
//         error: err.message,
//     });
// });


// async function init() {
//     try {
//         await mysqlPool.connect();
//     } catch (e) {
//         console.error(e);
//         process.exit(1);
//     }


//Init server
function init() {
    app.listen(process.env.PORT, () => {
        console.log(`The backend server is running in ${process.env.PORT}. Have a nice day`);
    });
}

init();

// Starting the server
// function init() {
//     app.listen(app.get('port'), () => {
//         console.log('The backend server is running on port', app.get('port'));
//     });
// }
// init();