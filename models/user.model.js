// requerimos mongoose

const mongoose = require("mongoose");

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
    // match: [
    //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    //   "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long",
    // ],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
