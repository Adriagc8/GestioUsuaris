const express =require('express');
const morgan =require ('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session= require('express-session');
const MySQLStore= require('express-mysql-session');
const passport = require('passport');

const {database}=require('./keys');

// Intializations
const app = express();
require('../lib/passport');

// Settings
app.set('port', process.env.PORT || 4000); //si existe puerto en el sistema tomelo sino 4000
app.set('views', path.join(__dirname)); //src/views
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('../lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;  //guardar usuario a nivel global para las vistas
    next();
  });  

  // Routes
  app.use(require('../routes'));
  app.use(require('../routes/authentication'));
  app.use('/rooms', require('../routes/links'));
 
  // Public
  app.use(express.static(path.join(__dirname, 'public')));
  // Starting the server
  app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
  });