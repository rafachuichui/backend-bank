const express = require('express');
const users = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');

const user = require("../model/user");
users.use(cors());
process.env.SECRET_KEY = 'secret'

//REGISTER
users.post('/register', (req, res) => {
    const today = new Date();
    const userData = {
        nombre: req.body.name,
        password: req.body.password,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        created: today
    }
    user.findeOne({
        where: { email: req.body.email }
    })
})
    .then(user => {
        if (!user) {
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            user.create(userData)
                .then(user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.json({ token: token })
                }).cathc(err => {
                    res.send('error: ' + err)
                })
        } else {
            res.send('user does not exist')
        }
    })
    .cathc(err => {
        res.send('error: ' + err)
    })


//LOGIN
user.post('/login', (req, res) => {
    user.findeOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.send('user does not exist')
            }
        })
        .cathc(err => {
            res.send('error: ' + err)
        })

})





