const express = require('express');
const router = express.Router();
const path = require('path');
// const getEvents = require('../db/read/readEvents');
const readUser = require('../db/read/readUser');
const validSession = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');

router.get('/', (req, res) => {
    const header = 'My account';
    const user = validSession(req.session);
    if (req.session.validSession) {
        const account = readUser(dbFile, user);
        res.render('read/account', { title: 'Homepage', account, user, header });
    } else {
    // res.render('index', { title: 'bruh', email});
        res.redirect('/login');
    }
});

module.exports = router;