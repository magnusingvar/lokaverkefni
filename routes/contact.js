const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const readUser = require('../db/read/readUser');
const validSession = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');
require('dotenv').config();

router.get('/', (req, res) => {    
    const user = validSession(req.session);
    if(req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        const account = readUser(dbFile, user);
        res.render('contact', { title: 'Contact', account, user, userPrivilege });
    } else {
        res.render('contact', { title: 'Contact', user });
    }
});

router.post('/', (req, res) => {
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });   

    const mailOptions = {
        to: 'magnuslokaverkefni@gmail.com',
        from: `"${req.body.firstName} ${req.body.lastName}" ${req.body.email}`,
        subject: 'Contact form - website',
        text: req.body.enquiry
    };

    transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
      res.redirect('/contact');
});

module.exports = router;