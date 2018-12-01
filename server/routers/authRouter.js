const express = require('express');
const passport = require('passport');
const secrets = require('../config/secrets');

const router = express.Router();

safeRedirectToReturnTo = (req, res) => {
    res.cookie('user', JSON.stringify(req.user.dataValues));
    res.redirect('http://localhost:3000');
};

router.get('/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({user: req.user.dataValues})
    } else {
        return res.status(401).json()
    }
});

router.get('/auth/facebook', passport.authenticate('facebook', secrets.facebook.authOptions));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/login',
}), safeRedirectToReturnTo);

router.get('/auth/github', passport.authenticate('github', secrets.github.authOptions));
router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: 'http://localhost:3000/login',
}), safeRedirectToReturnTo);


router.get('/auth/twitter', passport.authenticate('twitter', secrets.twitter.authOptions));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: 'http://localhost:3000/login',
}), safeRedirectToReturnTo);

router.get('/auth/linkedin', passport.authenticate('linkedin', secrets.linkedin.authOptions));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    failureRedirect: 'http://localhost:3000/login',
}), safeRedirectToReturnTo);

module.exports = router;