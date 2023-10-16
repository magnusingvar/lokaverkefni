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
    if (user) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (req.session.validSession && userPrivilege === 'administrator') {
            const room = readRoom(dbFile, req.query.id);
            const types = readRoomTypes(dbFile);
            if (room != undefined) {
                res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Update Room', operation: 'updateRoom', user, userPrivilege, room, types });
            } else {
                res.status(404).render('error', { title: 'Error', status: 404, msg: 'Page not found', user });
            }
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/', (req, res) => {
    const user = validSession(req.session);
    if (user) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (req.session.validSession && userPrivilege === 'administrator') {
            updateRoom(dbFile, req.body.id, req.body.type, req.body.occupancy, req.body.beds, req.body.bedType, req.body.ppn, req.body.description);
            res.redirect('/editRooms');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;