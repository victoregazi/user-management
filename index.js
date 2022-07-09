//Depencies...
const express = require('express');
//const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');

//Database
const db = require('./config/database')
//Test Database
db.authenticate()
  .then(() => console.log('database connected...'))
  .catch(err => console.log('error connecting' + err))

const app = express();

//log request and
app.use(morgan('tiny'));

//view engine configuration
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"))
//parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// static files
app.use(express.static(path.join(__dirname, 'public')));

//dotenv.config({path: 'config.env'})

// Routes
app.use('/', require('./routes/user'));
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, console.log(`SERVER STARTED ON ${PORT}`));