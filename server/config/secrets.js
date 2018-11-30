module.exports = {

    sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

    postgres: {},
    sessionTable: 'Session',

    mailgun: {
        user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
        password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
    },

    mandrill: {
        user: process.env.MANDRILL_USER || 'hackathonstarterdemo',
        password: process.env.MANDRILL_PASSWORD || 'E1K950_ydLR4mHw12a0ldA'
    },

    sendgrid: {
        api_key: process.env.SENDGRID_APIKEY || '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'
    },

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

    twitter: {
        consumerKey: process.env.TWITTER_KEY || '6NNBDyJ2TavL407A3lWxPFKBI',
        consumerSecret: process.env.TWITTER_SECRET || 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa',
        callbackURL: 'http://localhost:3001/auth/twitter/callback',
        passReqToCallback: true,
        enableProof: true,
        authOptions: {scope: ['email', 'user_location']}
    }
};

module.exports.postgres = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/Users';