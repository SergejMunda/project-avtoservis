const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
const loginRouter = require('./api/routes/login');
const registerRouter = require('./api/routes/register');
const contactRouter = require('./api/routes/contact');
const serviceRouter = require('./api/routes/service');

const app = express();

mongoose.connect(
    'mongodb://' +
    process.env.MONGO_USERNAME +
    ':' +
    process.env.MONGO_PW +
    '@ds237808.mlab.com:37808/avtoservis', {
        useNewUrlParser: true
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'api', 'views'));
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
app.use('/services', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/contact', contactRouter);
app.use('/services', serviceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;