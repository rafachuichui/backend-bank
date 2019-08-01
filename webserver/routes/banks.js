const express = require('express');
const router = express.Router();


const mysqlPool = require('../database/db');


router.get('/add', (req, res) => {
    res.send('banks/add');
});

//Receive data from the form
router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newBank = {
        title,
        url,
        description
    };
    console.log(newBank);
    await mysqlPool.query('INSERT INTO all_banks set ?'[newBank]);
    req.flash('success', 'Bank saved succesfully');
    res.redirect('/banks');
});


router.get('/banks', async (req, res) => {
    const banks = await mysqlPool.query('SELECT * FROM all_banks');
    console.log(banks);
    res.send('banks/list', { banks });
});


router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await mysqlPool.query('DELETE FROM all_banks WHERE id = ?', [id]);
    res.redirect('/banks');
});



router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const all_banks = mysqlPool.query('SELECT * FROM all_banks WHERE id = ?', [id]);
    console.log(all_banks);
    res.send('banks/edit', { all_banks: all_banks[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const newBank = {
        title,
        url,
        description,

    };
    await mysqlPool.query('UPDATE all_banks set ? WHERE id =?', [newBank, id]);
    res.redirect('/banks');
})

module.exports = router;