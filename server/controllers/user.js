const passport = require('passport');
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