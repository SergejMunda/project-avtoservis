const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./api/models/db');

// const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
// const loginRouter = require('./api/routes/login');
const registerRouter = require('./api/routes/register');
// const contactRouter = require('./api/routes/contact');
const serviceRouter = require('./api/routes/service');
const inventoryRouter = require('./api/routes/inventory');
const dbRouter = require('./api/routes/db');
const serviceTypeRouter = require('./api/routes/serviceType');

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
    'nav.directive.js': fs.readFileSync('app_client/all/directives/nav/nav.directive.js', 'utf-8')
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use('/services', express.static(path.join(__dirname, 'public')));
app.use('/services/add', express.static(path.join(__dirname, 'public')));
app.use('/inventory', express.static(path.join(__dirname, 'public')));
app.use('/inventory/add', express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
// app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
// app.use('/contact', contactRouter);
app.use('/api/services', serviceRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/db', dbRouter);
app.use('/api/serviceTypes', serviceTypeRouter);
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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

module.exports = app;
