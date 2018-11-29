const crypto = require('crypto');
const async = require('neo-async');
const passport = require('passport');
const emailService = require('../services/emailService.js');
const SummaryRepository = require('../repositories/SummaryRepository');
const UserRepository = require('../repositories/UserRepository.js');

exports.login = (req, res, next) => {
    const errors = req.validationErrors();
    if (errors) {
        res.json(errors)
    }
    passport.authenticate('local', (error, user) => {
        if (!user || error) {
            return res.status(500).json(user || error)
        }
        req.logIn(user, (error) => {
            if (error) {
                return res.status(500).json(error)
            }
            res.json(user)
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    return res.json({success: true});

};

exports.registration = (req, res) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must contain at least 4 characters').len(4);
    req.assert('confirmPassword', 'Entered passwords do not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        return res.status(500).json(errors)
    }
    UserRepository.createUser({
        email: req.body.email,
        password: req.body.password,
        tokens: {}
    })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) => {
            res.status(500).json(error)
        });
};

exports.getAllUsers = (req, res) => {
    UserRepository.getAllUsers()
        .then((allUsers) => {
            res.json(allUsers)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.getUserById = (req, res) => {
    UserRepository.getUserById(req.user.id)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
};

exports.updateUser = (req, res) => {
    UserRepository.updateUser(req.body.id, req.body)
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            res.json(error)
        });
};

exports.changePassword = (req, res) => {
    UserRepository.changePassword(req.user.id, req.body.password, req.body.confirmPassword)
        .then((req) => {
            res.status(200).json(req)
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.deleteUser = (req, res) => {
    UserRepository.deleteUser(req.body.id)
        .then(() => {
            return res.status(200).json({success: true});
        })
        .catch((error) => {
            return res.status(500)
        })
};

exports.createAdmin = (req, res) => {
    UserRepository.createAdmin(req.body)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((error) => {
            return res.status(500).json(error)
        });
};

exports.getReset = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    UserRepository.findUserByResetPswToken(req.params.token)
        .then((user) => {
            if (!user) {
                throw 'Password reset request is invalid or has expired.';
            }
        })
        .catch((error) => {
            return res.redirect('/forgot');
        });
};

exports.postReset = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        return res.redirect('/');
    }
    async.waterfall([
        (done) => {
            UserRepository.changeUserPswAndResetToken(req.params.token, req.body.password)
                .then((user) => {
                    req.logIn(user, (err2) => {
                        done(err2, user);
                    });
                })
                .catch((err) => {
                    done(err, null);
                });
        },
        (user, done) => {
            emailService.sendPasswordChangeNotificationEmail(user.email, (err) => {
                req.flash('info', {
                    msg: 'Password has been successfully changed. Notification e-mail has been sent to ' + user.email + ' to inform about this fact.'
                });
                done(err, 'done');
            });
        }
    ], (error) => {
        if (error) return next(error);
        res.redirect('/');
    });
};

exports.forgot = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address').isEmail();
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/forgot');
    }
    async.waterfall([
        (done) => {
            crypto.randomBytes(24, (err, buf) => {
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            const email = req.body.email.toLowerCase();
            UserRepository.assignResetPswToken(email, token)
                .then((user) => {
                    done(null, token, user);
                })
                .catch((err) => {
                    req.flash('errors', {msg: err});
                    return res.redirect('/forgot');
                });
        },
        (token, user, done) => {
            emailService.sendRequestPasswordEmail(user.email, req.headers.host, token, (error) => {
                done(error, 'done');
            });
        }
    ], (error) => {
        if (error) return next(error);
        res.json(error);
    });
};