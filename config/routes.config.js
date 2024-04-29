// requerimos todo lo que necesitamos

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const miscController = require("../controllers/misc.controller");
const plansController = require("../controllers/plans.controller");
const likesController = require("../controllers/likes.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = require("./storage.config");
// aqui pongo las rutas .

router.get("/", (req, res, next) => res.render("home"));

router.get(
  "/register",
  authMiddleware.isNotAuthenticated,
  usersController.register
);
router.post(
  "/register",
  authMiddleware.isNotAuthenticated,

  usersController.doRegister
);

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post(
  "/login",
  authMiddleware.isNotAuthenticated,
  authController.doLogin
);

router.get(
  "/profile",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUserProfile
);

router.get("/logout", authMiddleware.isAuthenticated, authController.logout);

router.get("/plans", plansController.getPlans);
router.get("/plans/:id", plansController.getPlan);

router.post(
  "/plans/:id/like",
  authMiddleware.isAuthenticated,
  likesController.doLike
);
// esto es lo que hace que se enlace con el app.js

module.exports = router;
