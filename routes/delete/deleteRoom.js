const express = require('express');
const path = require('path');
const readRoom = require('../../db/read/readRoom');
const deleteRoom = require('../../db/delete/deleteRoom');
const router = express.Router();
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.post('/', (req, res) => {
    const user = validSession(req.session);
    if (req.session.validSession) {
        deleteRoom(dbFile, req.body.id);
        res.redirect('/editRooms');
    } else {
        res.render('error', { title: 'Error', status: 403, msg: `Access denied.`, user });
    }
});

module.exports = router;