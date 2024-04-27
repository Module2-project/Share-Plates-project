
// Crear unos cuantos libros bajo el comando de consola npm run seeds para tener un estado inicial en la base de datos.
const mongoose = require("mongoose");
const Book = require("../models/Book.model");
const booksJSON = require("../data/plans.json");

// Me conecto a la base de datos
require("../config/db.config");

// Lanzamos las tareas una vez se haya realizado la conexión
mongoose.connection.once("open", () => {
  // Limpiamos base de datos

  mongoose.connection
    .dropCollection("plans")
    .then(() => {
      console.log("Database cleared");

      // Lanzar la petición a mongo de crear los libros a partir del JSON
      return Book.create(booksJSON);
    })
    .then((newPlans) => {
      newBooks.forEach((plan) => {
        console.log(`${User} has been created`);
      });

      console.log(`${newPlans.length} plans have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.connection
        .close()
        .then(() => console.log("Connection closed"))
        .catch((err) => console.log("Error disconnectiong:", err))
        .finally(() => process.exit(0));
    });
});

