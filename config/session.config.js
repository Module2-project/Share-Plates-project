// empezamos requiriendo todas las estancias que vamos a necestiar

const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const DB = require("./db.config");
const User = require("../models/user.model");

// aqui vamos a indicar el maximo de dias que queremos que pase la sesion abierta

const MAX_AGE = 7;

// configuracion de la sesion (informase sobre como funciona esto)

module.exports.sessionConfig = expressSession({
  secret: process.env.SESSION_SECRET || "super-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.COOKIE_SECURE === "true" ? true : false,
    httpOnly: true,
    maxAge: 24 * 3600 * 1000 * MAX_AGE,
  },
  store: new MongoStore({
    mongoUrl: DB,
    ttl: 24 * 3600 * MAX_AGE,
  }),
});

//configuracion para poder buscar un usario

module.exports.getCurrentCurrentUser = (req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId)

      .then((user) => {
        req.currentUser = user;
        res.locals.currentUser = user;
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
};