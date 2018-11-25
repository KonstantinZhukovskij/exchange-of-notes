const db = require('../models/sequelize');

const PSW_RESET_TOKEN_VALID_FOR = 3;
const ONE_HOUR = 3600000;
let repository = {};

repository.getUserById = (id) => {
    return db.User.findById(id);
};

repository.getAllUsers = () => {
    return db.User.findAll();
};

repository.createUser = (user) => {
    return db.User.count({where: {email: user.email}})
        .then((numberOfUsers) => {
            if (numberOfUsers > 0) {
                throw 'Account with this email is already registered';
            }
            const dbUser = db.User.build(user);
            dbUser.set('tokens', user.tokens);
            return dbUser.save();
        });
};

repository.assignResetPswToken = (email, token) => {
    return db.User.findOne({where: {email: email}})
        .then((user) => {
            if (!user)
                throw 'Account with such email does not exist';
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + PSW_RESET_TOKEN_VALID_FOR * ONE_HOUR;
            return user.save();
        });
};

repository.putUpdateUser = (userId, body) => {
    return db.User.findById(userId)
        .then((user) => {
            user.set('firstName', body.firstName);
            user.set('lastName', body.lastName);
            user.set('gender', body.gender);
            user.set('location', body.location);
            return user.save();
        });
};

repository.findUserByResetPswToken = (token) => {
    return db.User.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: new Date()}
        }
    });
};

repository.removeUserById = (userId) => {
    return db.User.destroy({where: {id: userId}});
};

repository.changeUserPassword = (userId, newPassword, newConfirmPassword) => {
    return db.User.findById(userId)
        .then((user) => {
            if (!user || newPassword !== newConfirmPassword) {
                return user.status(500);
            } else {
                user.password = newPassword;
                return user.save();
            }
        });
};

repository.changeUserPswAndResetToken = (token, newPassword) => {
    if (!token || token.length < 1)
        throw 'Token cannot be empty!';
    return db.User.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: new Date()}
        }
    })
        .then((user) => {
            if (!user)
                throw 'User was not found.';
            user.password = newPassword;
            user.set('resetPasswordToken', null);
            user.set('resetPasswordExpires', null);
            return user.save();
        });
};

repository.linkVkProfile = () => {
};

repository.createAccFromTwitter = () => {
};

repository.linkFacebookProfile = (userId, accessToken, refreshToken, profile) => {
    const profileId = profile.id.toString();
    return db.User.findOne({where: {facebookId: profileId}})
        .then((existingUser) => {
            return db.User.findById(userId);
        })
        .then((user) => {
            user.facebookId = profileId;
            if (!user.tokens) user.tokens = {};
            if (!user.profile) user.profile = {};
            user.tokens.facebook = accessToken;
            user.profile.name = user.profile.name || profile.displayName;
            user.profile.gender = user.profile.gender || profile._json.gender;
            user.set('tokens', user.tokens);
            user.set('profile', user.profile);
            return user.save();
        });
};

repository.createAccFromFacebook = (accessToken, refreshToken, profile) => {
    if (!profile._json) {
        throw 'Facebook profile is missing json property!';
    }
    const profileId = profile.id.toString();
    return db.User.findOne({where: {facebookId: profileId}})
        .then((existingUser) => {
            if (existingUser)
                return existingUser;
            return db.User.findOne({where: {email: profile._json.email}})
                .then((emailUser) => {
                    if (emailUser)
                        throw 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.';
                    const user = db.User.build({facebookId: profileId});
                    user.email = profile._json.email || (profileId + '@facebook.com');
                    user.tokens = {facebook: accessToken};
                    user.profile = {
                        name: profile.displayName,
                        gender: profile.gender
                    };
                    return user.save();
                });
        });
};

repository.linkTwitterProfile = (userId, accessToken, tokenSecret, profile) => {
    return db.User.findOne({where: {twitterId: profile.id.toString()}})
        .then((existingUser) => {
            if (existingUser)
                throw 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.';
            return db.User.findById(userId);
        })
        .then((user) => {
            user.twitterId = profile.id.toString();
            if (!user.tokens) user.tokens = {};
            if (!user.profile) user.profile = {};
            user.tokens.twitter = accessToken;
            user.tokens.twitterSecret = tokenSecret;
            user.profile.name = user.profile.name || profile.displayName;
            user.profile.location = user.profile.location || profile._json.location;
            user.set('tokens', user.tokens);
            user.set('profile', user.profile);
            return user.save();
        });
};

repository.createAccFromTwitter = (accessToken, tokenSecret, profile) => {
    return db.User.findOne({where: {twitterId: profile.id.toString()}})
        .then((existingUser) => {
            if (existingUser)
                return existingUser;
            const user = db.User.build({twitterId: profile.id.toString()});
            user.email = profile.username + "@twitter.com";
            user.tokens = {twitter: accessToken, twitterSecret: tokenSecret};
            user.profile = {
                name: profile.displayName,
                location: profile._json.location
            };
            return user.save();
        });
};

module.exports = repository;