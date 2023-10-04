const express = require('express');
const path = require('path');
const readMenu = require('../../db/read/readMenu');
const deleteMenuItem = require('../../db/delete/deleteMenuItem');
const router = express.Router();
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.post('/', (req, res) => {
    const user = validSession(req.session);
    if (req.session.validSession) {
        console.log(`deleted menu item with id of ${req.body.id}`);
        deleteMenuItem(dbFile, req.body.id);
        res.redirect('/editMenu');
    } else {
        res.render('error', { title: 'Error', status: 403, msg: `Access denied.`, user });
    }
});

module.exports = router;