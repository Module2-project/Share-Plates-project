// requerimos mongoose

const mongoose = require("mongoose");

//requerimos bcrypt para hashear la contraseña

const bcrypt = require("bcrypt");

//vamos a crear una constate para almacenar el error recurrido

const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");

// y aqui es donde damos limites a la contraseñan como el de caracteres

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// aqui indicamos las rounds que

const SALT_ROUNDS = 10;

//aqui lo que hacemos es el esquema de como tiene que ser los ussers , con todo lo que tiene que llevar , lo que es requerido y todas las reglas
// hemos puesto el esquema de ejemplo que nos dejo carlos , pero la idea es hacer uno propio

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    trim: true,
  },
  email: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    minLength: [8, "Password must be at least 8 characters long"],
  },

  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/plasoironhack/image/upload/v1713603564/ironhack/book-club/ywkmjbnwfy1vdhta1qwd.png",
  },
});

// esa funcion se encarga de saber si la contraseña necesita ser hasheada o no

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

// esta es la funcion que nos va a comprobar la contraseña

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
