const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const instanceMethods = {
    getGravatarUrl: function (size) {
        if (!size) size = 200;
        if (!this.email) {
            return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
        }
        const md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
    },
    getProfilePicture: function (size) {
        if (this.profile && this.profile.picture != null)
            return this.profile.picture;
        return this.getGravatarUrl(size);
    },
    hasSetPassword: function () {
        return this.password != null && this.password.length > 0;
    }
};

const beforeSaveHook = function (user, options, fn) {
    if (user.changed('password')) {
        this.encryptPassword(user.password, (hash, err) => {
            user.password = hash;
            fn(null, user);
        });
        return;
    }
    fn(null, user);
};

module.exports = (db, DataTypes) => {
    const User = db.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            isEmail: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        facebookId: {
            type: DataTypes.STRING,
            unique: true
        },
        twitterId: {
            type: DataTypes.STRING,
            unique: true
        },
        linkedInId: {
            type: DataTypes.STRING,
            unique: true
        },
        githubId: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        resetPasswordExpires: {
            type: DataTypes.DATE
        },
        resetPasswordToken: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        tokens: {
            type: DataTypes.JSON
        }
    }, {
        tableName: 'Users',
        instanceMethods: instanceMethods,
        classMethods: {
            associate: function (models) {
            },
            encryptPassword: (password, cb) => {
                if (!password) {
                    cb('', null);
                    return;
                }
                bcrypt.genSalt(10, (error, salt) => {
                    if (error) {
                        cb(null, error);
                        return;
                    }
                    bcrypt.hash(password, salt, null, (hErr, hash) => {
                        if (hErr) {
                            cb(null, hErr);
                            return;
                        }
                        cb(hash, null);
                    });
                });
            },
            findUser: (email, password, callback) => {
                User.findOne({
                    where: {email: email}
                })
                    .then((user) => {
                        if (user == null || user.password == null || user.password.length === 0) {
                            callback('User / Password combination is not correct', null);
                            return;
                        }
                        bcrypt.compare(password, user.password, function (err, res) {
                            if (res)
                                callback(null, user);
                            else
                                callback('Wrong password', null);
                        });
                    })
                    .catch((error) => {
                        callback(error, null);
                    });
            }
        },
        hooks: {
            beforeUpdate: beforeSaveHook,
            beforeCreate: beforeSaveHook
        },
        indexes: [
            {
                name: 'facebookIdIndex',
                method: 'BTREE',
                fields: ['facebookId']
            },
            {
                name: 'twitterIdIndex',
                method: 'BTREE',
                fields: ['twitterId']
            },
            {
                name: 'githubIdIndex',
                method: 'BTREE',
                fields: ['githubId']
            },
            {
                name: 'linkedInIdIndex',
                method: 'BTREE',
                fields: ['linkedInId']
            },
        ]
    });
    return User;
};