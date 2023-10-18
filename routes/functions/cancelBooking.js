const express = require('express');
const router = express.Router();
const path = require('path');
const cancel = require('../../db/delete/deleteBooking');
const readUser = require('../../db/read/readUser');
const validSession = require('./userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

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