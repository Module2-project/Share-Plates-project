//empezamos requierosiendo el user model que queremos  atacar con este controller

const User = require("../models/user.model");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users/list", { users }); // Renderizar la vista una vez con los usuarios recuperados
    })
    .catch((err) => {
      console.error("Error al obtener usuarios:", err);
      res.status(500).send("Error interno del servidor"); // Manejar errores
    });
};

module.exports.register = (req, res, next) => {
  res.render("users/register");
};

module.exports.doRegister = (req, res, next) => {
  console.log(req.body);

  User.create(req.body)
    .then((user) => {
      console.log("User created:", user);
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.render("users/register", { errors: err.errors, user: req.body });
    });
};
