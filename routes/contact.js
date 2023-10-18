const express = require('express');
const router = express.Router();
const path = require('path');
const sendMail = require('./functions/mail');
const readUser = require('../db/read/readUser');
const validSession = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');

router.get('/', (req, res) => {    
    const user = validSession(req.session);
    if(req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        const account = readUser(dbFile, user);
        res.render('contact', { title: 'Contact', account, user, userPrivilege });
    } else {
        res.render('contact', { title: 'Contact', user });
    }
});

router.post('/', (req, res) => {
    const recipient = 'magnuslokaverkefni@gmail.com';
    const sender = `"${req.body.firstName} ${req.body.lastName}" ${req.body.email}`;
    const subject = 'Contact form - website';
    const text = req.body.enquiry;
    const html = '';
    sendMail(recipient, sender, subject, text, html);
    res.redirect('/contact');
});

module.exports = router;