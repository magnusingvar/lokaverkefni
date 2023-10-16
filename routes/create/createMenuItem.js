const express = require('express');
const router = express.Router();
const path = require('path');
const createMenuItem = require('../../db/create/createMenuItem');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    if (user) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (req.session.validSession && userPrivilege === 'administrator') {
            res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Menu Item', operation: 'createMenuItem', user, userPrivilege, error: '' });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/', (req, res) => {
    const user = validSession(req.session);
    let errorMessage = '';
    try {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (req.session.validSession && userPrivilege === 'administrator') {
            if (!/\S/.test(req.body.menuitem)) {
                errorMessage = 'Menu item creation failed';
                res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Menu Item', operation: 'createMenuItem', user, userPrivilege, error: errorMessage });
            } else {
                createMenuItem(dbFile, req.body.menu, req.body.menuitem);
                res.redirect('/createMenuItem');
            }
        }        
    } catch (e) {
        res.redirect('/');
    }
});

module.exports = router;