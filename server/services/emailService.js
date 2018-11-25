const secrets = require('../config/secrets');
const mailer = require('sendgrid')(secrets.sendgrid.api_key);

let service = {};

const applicationName = 'Express Starter';
const senderAddress = 'Mailing <mailing@starter.com>';

service.sendRequestPasswordEmail = (email, host, token, done) => {
    const mailOptions = {
        to: email,
        from: senderAddress,
        subject: 'Reset your password on ' + applicationName,
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    mailer.send(mailOptions, done);
};

service.sendPasswordChangeNotificationEmail = (email, done) => {
    const mailOptions = {
        to: email,
        from: senderAddress,
        subject: 'Your ' + applicationName + ' password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + email + ' has just been changed.\n'
    };
    mailer.send(mailOptions, done);
};

module.exports = service;