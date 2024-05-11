const mongoose = require("mongoose");

const Plan = require("../models/plans.model");
const plansJSON = require("../data/plans.json");

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
      return Plan.create(plansJSON);
    })
    .then((newPlans) => {
      newPlans.forEach((plan) => {
        console.log(`${plan.planname} has been created`);
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