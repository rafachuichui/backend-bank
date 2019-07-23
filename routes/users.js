const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mysql = require('../database/db')

process.env.SECRET_KEY = 'secret'

//REGISTER
router.post('/register', async (req, res) => {
    const today = new Date().toString();
    const userData = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        created: today
    };

    const mysqlQuery = 'INSERT INTO users SET ?';
    try {
        const connection = await mysql.getConnection();

        const user = await connection.query('SELECT * FROM users');

        await connection.query(mysqlQuery, userData);

        connection.release();
    } catch (error) {
        return res.send(error);
    }

    res.status(201).send();
})


//LOGIN
router.post('/login', async (req, res) => {
    const accountData = req.body;

    try {
        const mysqlQuery = `SELECT userid, email, password FROM users WHERE email='${accountData.email}'`;
        const connection = await mysql.getConnection();
        const [userDB] = await connection.query(mysqlQuery);
        if (userDB.length !== 1) {
            return res.status(401).send();
        }

        const userData = userDB[0];
        if (bcrypt.compareSync(accountData.password, userData.password)) {
            return res.status(401).send();
        }
        const tokenJwt = jwt.sign({
            userid: userData.userid,
            email: userData.email,
        }, process.env.AUTH_JWT_SECRET,
            { expiresIn: parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10) })

        return res.status(200).send({
            accessToken: tokenJwt,
            expiresIn: parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10),
        });
    } catch (error) {
        res.send(error);
    }
});



// //PROFILE
// router.get('/profile', (req, res) => {
//     const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
//     User.findeOne({
//         where: { userid: decoded.userid }
//     })
//         .then(user => {
//             if (user) {
//                 res.json(user)
//             } else {
//                 res.send('User does not exist')
//             }
//         })
//         .cathc(err => {
//             res.send('error: ' + err)
//         })
// })



module.exports = router