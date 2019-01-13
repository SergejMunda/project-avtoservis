require('dotenv').load();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var passport = require('passport');

require('./api/models/db');
require('./api/config/passport');

// const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
const loginRouter = require('./api/routes/login');
const registerRouter = require('./api/routes/register');
// const contactRouter = require('./api/routes/contact');
const serviceRouter = require('./api/routes/service');
const inventoryRouter = require('./api/routes/inventory');
const dbRouter = require('./api/routes/db');
const serviceTypeRouter = require('./api/routes/serviceType');
const auditRouter = require('./api/routes/audience');

var uglifyJs = require('uglify-js');
var fs = require('fs');

var combinedCode = uglifyJs.minify({
    'app.js': fs.readFileSync('app_client/app.js', 'utf-8'),
    'serviceData.service.js': fs.readFileSync(
        'app_client/all/services/serviceData.service.js',
        'utf-8'
    ),
    'service.controller.js': fs.readFileSync('app_client/services/services.controller.js', 'utf-8'),
    'service-form.controller.js': fs.readFileSync(
        'app_client/serviceForm/serviceForm.controller.js',
        'utf-8'
    ),
    'inventory.controller.js': fs.readFileSync(
        'app_client/inventory/inventory.controller.js',
        'utf-8'
    ),
    'frontPage.controller.js': fs.readFileSync(
        'app_client/frontPage/frontPage.controller.js',
        'utf-8'
    ),
    'contact.controller.js': fs.readFileSync('app_client/contact/contact.controller.js', 'utf-8'),
    'dbPage.controller.js': fs.readFileSync('app_client/dbPage/dbPage.controller.js', 'utf-8'),
    'inventoryData.service.js': fs.readFileSync(
        'app_client/all/services/inventoryData.service.js',
        'utf-8'
    ),
    'audit.service.js': fs.readFileSync('app_client/all/services/audit.service.js', 'utf-8'),
    'inventory-form.controller.js': fs.readFileSync(
        'app_client/inventoryForm/inventoryForm.controller.js',
        'utf-8'
    ),
    'auth.service.js': fs.readFileSync('app_client/all/services/auth.service.js', 'utf-8'),
    'registration.controller.js': fs.readFileSync(
        'app_client/auth/registration/registration.controller.js',
        'utf-8'
    ),
    'login.controller.js': fs.readFileSync('app_client/auth/login/login.controller.js', 'utf-8'),

    'nav.directive.js': fs.readFileSync('app_client/all/directives/nav/nav.directive.js', 'utf-8'),
    
    'dbData.service.js' : fs.readFileSync('app_client/all/services/dbData.service.js', 'utf-8')
});
fs.writeFile('public/angular/autoservice.min.js', combinedCode.code, function(error) {
    if (error) console.log(error);
    else console.log('Script is in "comments.min.js".');
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(function(req, res, next) {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use('/services', express.static(path.join(__dirname, 'public')));
app.use('/services/add', express.static(path.join(__dirname, 'public')));
app.use('/inventory', express.static(path.join(__dirname, 'public')));
app.use('/inventory/add', express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
// app.use('/contact', contactRouter);
app.use('/api/services', serviceRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/db', dbRouter);
app.use('/api/serviceTypes', serviceTypeRouter);
app.use('/api/audit', auditRouter);
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            message: err.name + ': ' + err.message
        });
    }
});
app.use(function(err, req, res, next) {
    if (err.code === 'permission_denied') {
        res.status(403).send('Forbidden');
    }
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
handleError = function(err, res) {
    res.status(err.status || 500);
    res.render(err.message || 'error');
};
module.exports = app;
