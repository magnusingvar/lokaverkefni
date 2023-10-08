const express = require('express');
const router = express.Router();
const path = require('path');
const createMenuItem = require('../../db/create/createMenuItem');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const error = req.query.error;

    try {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (error != 1) {
            res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Menu Item', operation: 'createMenuItem', user, userPrivilege, msg: '' });
        } else {
            res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Menu Item', operation: 'createMenuItem', user, userPrivilege, msg: 'Item creation failed.' });
        }
    } catch (e) {
        res.redirect('/');
    }
});

router.post('/', (req, res) => {
    if (userPrivilege = 'administrator') {
        if (req.body.menuitem || !(req.body.menuitem.trim() === '')) {
            createMenuItem(dbFile, req.body.menu, req.body.menuitem);
            res.redirect('/createMenuItem');
        } else {
            res.redirect('/createMenuItem?error=1');
        }
    } else {
        res.send('not authorized');
    }
});

module.exports = router;