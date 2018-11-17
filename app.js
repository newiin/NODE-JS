const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
var methodOverride = require('method-override')
const fs = require('fs');
const edge = require('edge.js');
const app = express();


//Custom modules
const LocalStrategy=require('./config/passport-local');
const config=require('./config/config');
const mainRoute=require('./routes/main');
const fakerRoute=require('./routes/faker');
/**
 * DATABASE
 */
//Require DB
const DB = require('./database/db');

/**
 * MIDDLEWARE
 */
app.use(require('express-edge'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', `${__dirname}/views`);
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))
app.use(expressValidator());
app.use(mainRoute);
app.use(fakerRoute);

/**
 * SERVER
 */
app.listen(config.port, err => {
    if (err) {
        console.log('we can not conneted to the server');
    } else {
        console.log(`connected to the server at port ${config.port}`)
    }
})