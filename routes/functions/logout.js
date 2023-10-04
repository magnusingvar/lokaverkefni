const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
});

module.exports = router;