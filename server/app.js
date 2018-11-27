const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const multer = require('multer');
const Promise = require('bluebird');
const flash = require('express-flash');
const path = require('path');
const passport = require('passport');
const expressValidator = require('express-validator');
const connectAssets = require('connect-assets');
const db = require('./models/sequelize');
const secrets = require('./config/secrets');
const passportConfig = require('./config/passport');
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const summaryController = require('./controllers/summary');
const commentController = require('./controllers/comment');
const questionController = require('./controllers/question');

const app = express();
app.use(cors());

app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'public')));
app.enable("trust proxy");
app.use(compress());
app.use(connectAssets({
    paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')]
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: path.join(__dirname, 'uploads')}).single());
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());

Promise.longStackTraces();

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
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.gaCode = secrets.googleAnalyticsCode;
    next();
});
app.use((req, res, next) => {
    if (/api/i.test(req.path)) req.session.returnTo = req.path;
    next();
});
app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', res.locals._csrf, {httpOnly: false});
    next();
});
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 2592000000}));

app.get('/', homeController.index);
app.post('/registration', userController.registration);
app.post('/login', userController.login);
app.get('/logout', userController.logout);
app.post('/forgot', userController.forgot);
// app.get('/allSummaries', summaryController.getAllSummaries);
app.post('/create', summaryController.postSummary);
app.get('/summary', summaryController.getPaginationSummaries);
app.get('/popularSummary', summaryController.getPopularSummaries);
app.get('/summary/:id', summaryController.getSummaryById);
app.put('/summary/:id', summaryController.updateSummary);
app.delete('/summary', summaryController.deleteSummary);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/users', userController.getAllUsers);
app.get('/user', userController.getUserById);
app.put('/account/profile', passportConfig.isAuthenticated, userController.updateUser);
app.put('/account/password', passportConfig.isAuthenticated, userController.changePassword);
app.delete('/account/delete', userController.deleteUser);
app.put('/admin', userController.createAdmin);
app.get('/authorSummary', summaryController.getAllAuthorSummaries);
app.post('/comment', commentController.postComment);
app.get('/comment/:id', commentController.getAllCommentsToSummary);
app.post('/question', questionController.createQuestion);
app.get('/question', questionController.getAllQuestions);

safeRedirectToReturnTo = (req, res) => {
    res.redirect('http://localhost:3000');
};

app.get('/auth/facebook', passport.authenticate('facebook', secrets.facebook.authOptions));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: 'http://localhost:3000/login',
}), safeRedirectToReturnTo);

app.get('/auth/twitter', passport.authenticate('twitter', secrets.twitter.authOptions));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/login',
    failureFlash: true
}), safeRedirectToReturnTo);

app.use(errorHandler());

db.sequelize.sync({force: false})
    .then(() => {
        app.listen(app.get('port'), () => {
            console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
        });
    });

module.exports = app;
