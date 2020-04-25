const bcrypt = require('bcryptjs');

const helpers = {};

//cifrar contrasenya
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //generar hash
  const hash = await bcrypt.hash(password, salt); //cifrar con el hash
  return hash;
};

//comparar contrasenyas en logueo
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword); //return true or false
  } catch (e) { //cuando falle puedes enviar eeror por pantalla con flash
    console.log(e)
  }
};

module.exports = helpers;
