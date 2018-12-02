module.exports = {

    sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

    postgres: {},
    sessionTable: 'Session',

    facebook: {
        clientID: process.env.FACEBOOK_ID || '338162873433284',
        clientSecret: process.env.FACEBOOK_SECRET || 'ea87626467e1cf61ac2b0edf37c063f8',
        callbackURL: 'http://localhost:3001/auth/facebook/callback',
        passReqToCallback: true,
        enableProof: true,
        authOptions: {scope: ['email', 'user_location']}
    },

    github: {
        clientID: process.env.GITHUB_ID || '3a0bed93a557426bb71b',
        clientSecret: process.env.GITHUB_SECRET || '34f507070717a8af6ca7bca110c32408b754a6be',
        callbackURL: 'http://localhost:3001/auth/github/callback',
        passReqToCallback: true,
        enableProof: true,
        authOptions: {scope: ['email', 'user_location']}
    },

    linkedin: {
        consumerKey: process.env.LINKEDIN_ID || '86gqm6vc1be3vg',
        consumerSecret: process.env.LINKEDIN_SECRET || 'CgQbBzTqhSBF1e6K',
        callbackURL: process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:3001/auth/linkedin/callback',
        passReqToCallback: true,
        enableProof: true,
        authOptions: {scope: ['r_basicprofile', 'r_emailaddress', 'w_share']}
    },
};

module.exports.postgres = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/Users';