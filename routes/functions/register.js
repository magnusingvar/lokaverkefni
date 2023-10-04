const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const registerUser = require('../../db/functions/registerFunction');
const dbFile = path.join(__dirname, '../../db/database.db');
require('dotenv').config()

// get register page
router.get('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'Register';

    // form data
    const form = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    };

    if(req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('register', { title: 'Register', user, header, userPrivilege, form: form, error: '' });
    } else {
        res.render('register', { title: 'Register', user, header, form: form, error: '' });
    }
});

// post register page
router.post('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'Register';

    /* Keep the form data to use when
	an error is thrown so the user
	does not have to retype it */
    const form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.verifyPassword
    };
    
    try {
        // request register inputs
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.verifyPassword;

        /* if the verify password field matches
		the password field run the registerUser function
		else throw an error message with the message :
		'Passwords do not match' and if they match
        register the user and send them a confirmation
        email to verify their account */
        if (password !== password2) {	
            res.render('register', { title: 'Register', user, header, form: form, error: 'Passwords do not match' });
        } else {
            registerUser(dbFile, firstName, lastName, email, password);

            const EMAIL_SECRET = 'supersecrettoken'

            let emailToken = jwt.sign(
                {
                    user: readUser(dbFile, email).id,
                },
                EMAIL_SECRET,
                {
                    expiresIn: '1d',
                },
            );
            
            const hostname = req.hostname;
            const url = `http://${hostname}:3000/account/confirmation/${emailToken}`
            
            let transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASSWORD
                }
            });   
            
            const mailOptions = {
                from: '"Lokaverkefni" <magnuslokaverkefni@gmail.com>',
                to: email,
                subject: 'Confirm your account',
                html: `Use the following link to confirm your account: <a href="${url}">Confirm</a>`
            };

            transport.sendMail(mailOptions);

            res.redirect('/login');
        }
    } catch (e) {
        res.render('register', { title: 'Register', user, header, form: form, error: 'Email is already associated with an account' });
    }
});

module.exports = router;