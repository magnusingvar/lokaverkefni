const express = require('express');
const path = require('path');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const cancel = require('../../db/delete/deleteBooking');
const dbFile = path.join(__dirname, '../../db/database.db');
const validSession = require('./userSession');

router.post('/', (req, res) => {
  const user = validSession(req.session);
  if (req.session.validSession) {
    const userId = readUser(dbFile, user).id;
    const cookie = req.cookies['basket'];

    if (cookie != null) {
      res.clearCookie('basket');
    }

    cancel(dbFile, req.body.id, userId);
    res.redirect(`/bookings`);
  } else {
    res.redirect('/');
  }
});

module.exports = router;