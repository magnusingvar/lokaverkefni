const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const readUser = require('../../db/read/readUser');
const updateAccount = require('../../db/update/updateAccount');
const deleteUser = require('../../db/delete/deleteUser');
const validSession = require('../functions/userSession');
const confirmAccount = require('../../db/functions/confirmFunction');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const header = 'My account';
    const user = validSession(req.session);
    if (req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        const account = readUser(dbFile, user);
        res.render('read/account', { title: 'My account', account, user, userPrivilege, header });
    } else {
        res.redirect('/login');
    }
});

router.get('/confirmation/:token', async (req, res) => {
    try {
        const user = jwt.verify(req.params.token, 'supersecrettoken');
        confirmAccount(dbFile, user.user)
        res.redirect('/login')
    } catch (e) {
        res.send('You have already confirmed your account');
    }
});

router.get('/update', (req, res) => {
    updateAccount(dbFile, req.query.firstName, req.query.lastName, req.query.email, req.query.userId);
    res.redirect('/account');
});

router.get('/delete', (req, res) => {
    const email = validSession(req.session);
    const user = readUser(dbFile, email);
    
    try {
        deleteUser(dbFile, user.email);
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.redirect('/');
    } catch (e) {
        res.redirect('/');
    }
});

module.exports = router;