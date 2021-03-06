const db = require('../models/sequelize');

const PSW_RESET_TOKEN_VALID_FOR = 3;
const ONE_HOUR = 3600000;
let repository = {};

getEmailFromGithubProfile = (profile) => {
    let email;
    if (profile.emails && profile.emails.length > 0 && profile.emails[0].value)
        email = profile.emails[0].value;
    else
        email = profile.id + '@github.com';
    return email;
};

getEmailFromLinkedinProfile = (profile) => {
    let email;
    if (profile.emails && profile.emails.length > 0 && profile.emails[0].value)
        email = profile.emails[0].value;
    else
        email = profile.id + '@linkedin.com';
    return email;
};

repository.getUserById = (userId) => {
    return db.User.findById(userId)
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

repository.updateUser = (userId, body) => {
    return db.User.findById(userId)
        .then((user) => {
            user.set('firstName', body.firstName);
            user.set('lastName', body.lastName);
            user.set('gender', body.gender);
            user.set('location', body.location);
            return user.save();
        });
};

repository.changePassword = (userId, newPassword, newConfirmPassword) => {
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

repository.deleteUser = (userId) => {
    return db.User.destroy(
        {
            where: {id: userId}
        }
    );
};

repository.createAdmin = (body) => {
    return db.User.findById(body.user.id)
        .then((user) => {
            user.set('isAdmin', body.user.isAdmin);
            return user.save();
        });
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
            user.set('tokens', user.tokens);
            user.set('profile', user.profile);
            return user.save();
        });
};

repository.createAccountFromFacebook = (accessToken, refreshToken, profile) => {
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
                        throw 'There is already an account using this email address';
                    const user = db.User.build({facebookId: profileId});
                    user.email = profile._json.email || (profileId + '@facebook.com');
                    user.tokens = {facebook: accessToken};
                    user.profile = {
                        name: profile.displayName,
                    };
                    return user.save();
                });
        });
};

repository.linkGithubProfile = (userId, accessToken, tokenSecret, profile) => {
    const profileId = profile.id.toString();
    return db.User.findOne({where: {githubId: profileId}})
        .then((existingUser) => {
            if (existingUser)
                throw 'There is already a GitHub account that belongs to you';
            return db.User.findById(userId);
        })
        .then((user) => {
            user.githubId = profileId;
            if (!user.tokens) user.tokens = {};
            if (!user.profile) user.profile = {};
            user.tokens.github = accessToken;
            user.profile.name = user.profile.name || profile.displayName;
            user.set('tokens', user.tokens);
            user.set('profile', user.profile);
            return user.save();
        });
};

repository.createAccountFromGithub = (accessToken, tokenSecret, profile) => {
    const profileId = profile.id.toString();
    const email = getEmailFromGithubProfile(profile);
    if (!profile._json)
        profile._json = {};
    return db.User.findOne({where: {githubId: profileId}})
        .then((existingUser) => {
            if (existingUser)
                return existingUser;
            return db.User.findOne({where: {email: email}})
                .then((emailUser) => {
                    if (emailUser)
                        throw 'There is already an account using this email address.';
                    const user = db.User.build({githubId: profileId});
                    user.email = email;
                    user.tokens = {github: accessToken};
                    user.profile = {
                        name: profile.displayName,
                    };
                    return user.save();
                });
        });
};

repository.linkLinkedInProfile = (userId, accessToken, tokenSecret, profile) => {
    return db.User.findOne({where: {linkedInId: profile.id.toString()}})
        .then((existingUser) => {
            if (existingUser)
                throw 'There is already a LinkedIn account that belongs to you';
            return db.User.findById(userId);
        })
        .then((user) => {
            user.linkedInId = profile.id.toString();
            if (!user.tokens) user.tokens = {};
            if (!user.profile) user.profile = {};
            user.tokens.linkedin = accessToken;
            user.profile.name = user.profile.name || profile.displayName;
            user.set('tokens', user.tokens);
            user.set('profile', user.profile);
            return user.save();
        });
};

repository.createAccountFromLinkedIn = (accessToken, tokenSecret, profile) => {
    const profileId = profile.id.toString();
    const email = getEmailFromLinkedinProfile(profile);
    if (!profile._json)
        profile._json = {};
    return db.User.findOne({where: {linkedInId: profileId}})
        .then((existingUser) => {
            if (existingUser)
                return existingUser;
            return db.User.findOne({where: {linkedInId: profileId}})
                .then((existingEmailUser) => {
                    if (existingEmailUser)
                        throw 'There is already an account using this email address';
                    const user = db.User.build({linkedInId: profileId});
                    user.email = email;
                    user.tokens = {linkedin: accessToken};
                    user.profile = {
                        name: profile.displayName,
                    };
                    return user.save();
                });
        });
};

module.exports = repository;