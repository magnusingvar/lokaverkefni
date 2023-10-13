const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const readMenuItem = require('../../db/read/readMenuItem');
const updateMenuItem = require('../../db/update/updateMenuItem');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    try {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege == "administrator") {
            const menuItem = readMenuItem(dbFile, req.query.id);
            if (menuItem != undefined) {
                res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Update Menu Item', operation: 'updateMenuItem', user, userPrivilege, menuItem });
            } else {
                res.status(404).render('error', { title: 'Error', status: 404, msg: 'Page not found', user });
            }
        } else {
            res.redirect('/');
        }
    } catch (e) {
        res.redirect('/');
    }
});

router.post('/', (req, res) => {
    updateMenuItem(dbFile, req.body.menu, req.body.menuitem, req.body.id);
    res.redirect('/editMenu');
})

module.exports = router;