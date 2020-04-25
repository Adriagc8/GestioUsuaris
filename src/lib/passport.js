//metodos authentificacion
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../views/database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]); //retorna un objecto con todas sus propiedades
  //puede haver ms de un usuario con el mismo username
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password) //treu o false
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.username));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password', //indicar de donde recibes el Field
    passReqToCallback: true //recibir datos adicionales
  },async (req, username, password, done) =>{

    const { fullname } = req.body;
    let newUser = {
    fullname,
    username,
    password
  };
    newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', [newUser]);
  //retorno de datos del usuario
  newUser.id = result.insertId;
  return done(null, newUser);
  
}));

passport.serializeUser((user, done) => {
    done(null, user.id); //guardar sesion en app
  });
  
  passport.deserializeUser(async (id, done) => { //done es para continuar con la resta del codigo
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]); 
    done(null, rows[0]); //salir de la sesion
  });