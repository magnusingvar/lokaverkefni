const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const readRoom = require('../../db/read/readRoom');
const readRoomTypes = require('../../db/read/readRoomTypes');
const updateRoom = require('../../db/update/updateRoom');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    try {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege == "administrator") {
            const room = readRoom(dbFile, req.query.id);
            const types = readRoomTypes(dbFile);
            res.render('roomCreatorEditor/roomCreatorEditor', { title: 'Create Room', operation: 'update', user, userPrivilege, room, types});
        } else {
            res.render('error', { title: 'Error', status: 403, msg: `Access denied.`, username });
        }
    } catch (e) {
        res.redirect('/');
    }
});

router.post('/', (req, res) => {
    updateRoom(dbFile, req.body.id, req.body.occupancy, req.body.beds, req.body.ppn, req.body.description);
    res.redirect('/edit');
});

module.exports = router;