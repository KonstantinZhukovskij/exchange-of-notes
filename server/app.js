const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const passport = require('passport');
const expressValidator = require('express-validator');
const db = require('./models/sequelize');
const secrets = require('./config/secrets');
const routers = require('./routers');

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    store: new pgSession({
        conString: secrets.postgres,
        tableName: secrets.sessionTable
    }),
    secret: secrets.sessionSecret,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routers);
app.use(errorHandler());

db.sequelize.sync({force: false})
    .then(() => {
        app.listen(app.get('port'), () => {
            console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
        });
    });

module.exports = app;