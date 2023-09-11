const express = require('express');
const path = require('path');
const router = express.Router();
const readRoom = require('../../db/read/readRoom');
const updateRoom = require('../../db/update/updateRoom');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const room = readRoom(dbFile, req.query.id);
    res.render('roomCreatorEditor/roomCreatorEditor', { title: 'Edit Room', operation: 'update', room });
});

router.post('/', (req, res) => {
    updateRoom(dbFile, req.body.type, req.body.price);
    res.redirect('/');
});

module.exports = router;