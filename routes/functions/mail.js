const nodemailer = require('nodemailer');
require('dotenv').config();

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

 module.exports = function sendMail(recipient, sender, subject, text, html) {
    const mailOptions = {
        from: sender,
        to: recipient,
        subject,
        text,
        html
    };

    transport.sendMail(mailOptions);
};