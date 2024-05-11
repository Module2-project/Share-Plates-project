const User = require("../models/user.model");

module.exports.login = (req, res, next) => {
  res.render("login");
};

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body;

  const LOGIN_ERROR_MESSAGE = "Email o contraseña incorrectos";

  const renderWithErrors = (error, values) => {
    res.render("login", { error, values });
  };

  // Comprobamos que nos envían ambos campos en el formulario, sino renderizamos la vista con los errores
  if (!password || !email) {
    renderWithErrors("Campos incompletos", { email });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        // Checkear la password
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user._id;
            res.redirect("/profile");
          } else {
            renderWithErrors(LOGIN_ERROR_MESSAGE, { email });
          }
        });
      } else {
        renderWithErrors(LOGIN_ERROR_MESSAGE, { email });
      }
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};