const express = require('express');
const path = require('path');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const cancel = require('../../db/delete/deleteBooking');
const dbFile = path.join(__dirname, '../../db/database.db');
const validSession = require('./userSession');

router.post('/', (req, res) => {
  const user = validSession(req.session);
  const userId = readUser(dbFile, user).id;
  cancel(dbFile, req.body.id, userId);
  res.redirect(`/bookings`)
});

module.exports = router;