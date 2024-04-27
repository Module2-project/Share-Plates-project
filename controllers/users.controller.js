//empezamos requierosiendo el user model que queremos  atacar con este controller
const mongoose = require("mongoose");
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

// Recibo un post con los campos del usuario y lo guardo en base de datos
module.exports.doRegister = (req, res, next) => {
  const renderWithErrors = (errors, values) => {
    res.render("register", { errors, values });
  };

  if (req.file) {
    req.body.avatar = req.file.path;
  }

  User.create(req.body)
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors, req.body);
      } else {
        next(err);
      }
    });
};
module.exports.getCurrentUserProfile = (req, res, next) => {
  console.log(req.currentUser);
  res.render("profile");
};
