// requerimos todo lo que necesitamos

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const miscController = require("../controllers/misc.controller");
const plansController = require("../controllers/plans.controller");

// aqui pongo las rutas , voy  a poner por lo pronto las de carlos

router.get("/", miscController.getHome);
router.get("/users", usersController.getUsers);
router.get("/users/register", usersController.register);
router.post("/users/register", usersController.doRegister);

// esto es lo que hace que se enlace con el app.js

module.exports = router;
