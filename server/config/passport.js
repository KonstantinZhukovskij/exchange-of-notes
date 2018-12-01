const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const secrets = require('./secrets');
const db = require('../models/sequelize');
const UserRepository = require('../repositories/UserRepository');
const userController = require('../controllers/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findById(id)
        .then((user) => {
            done(null, user);
        }).catch((error) => {
        done(error);
    });
});

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    email = email.toLowerCase();
    db.User.findUser(email, password, (error, user) => {
        if (error || !user) {
            return done(error, false)
        }
        return done(null, user);
    });
}));

passport.use(new FacebookStrategy(secrets.facebook, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
        UserRepository.linkFacebookProfile(req.user.id, accessToken, refreshToken, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(null, false, {message: error});
            });
    } else {
        UserRepository.createAccountFromFacebook(accessToken, refreshToken, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error);
            });
    }
}));

passport.use(new GitHubStrategy(secrets.github, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
        UserRepository.linkGithubProfile(req.user.id, accessToken, refreshToken, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(null, false, {message: error});
            });
    } else {
        UserRepository.createAccountFromGithub(accessToken, refreshToken, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error);
            });
    }
}));

passport.use(new TwitterStrategy(secrets.twitter, (req, accessToken, tokenSecret, profile, done) => {
    if (req.user) {
        UserRepository.linkTwitterProfile(req.user.id, accessToken, tokenSecret, profile)
            .then((user) => {
                req.done(null, user);
            })
            .catch((error) => {
                req.done(null, false, {message: error});
            });
    } else {
        UserRepository.createAccountFromTwitter(accessToken, tokenSecret, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error);
            });
    }
}));

passport.use(new LinkedInStrategy(secrets.linkedin, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
        UserRepository.linkLinkedInProfile(req.user.id, accessToken, refreshToken, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(null, false, {message: error});
            });
    } else {
        UserRepository.createAccountFromLinkedIn(accessToken, refreshToken, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error);
            });
    }
}));

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    if (req.user.tokens[provider]) {
        next();
    } else {
        res.redirect('/auth/' + provider);
    }
};

exports.isAdmin = (req, res, next) => {
    userController.getUserById(req.body.id);
    if (res.user.isAdmin === true) {
        return next()
    } else
        res.redirect('http://localhost:3000/notFound')
};