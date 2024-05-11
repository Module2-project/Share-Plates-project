// requerimos todo lo que necesitamos

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const miscController = require("../controllers/misc.controller");
const plansController = require("../controllers/plans.controller");
const likesController = require("../controllers/likes.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const Plan = require("../models/plans.model");
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

router.get("/users/edit-profile", usersController.editProfile);

router.get("/users/:userId", usersController.getUserById);

router.get("/plans/create-plan", plansController.renderCreatePlan);
router.post(
  "/plans/create-plan",
  upload.single("avatar"),
  plansController.createPlan
);

router.get("/plans", plansController.getPlans);
router.get("/plans/:id", plansController.getPlan);
router.get("/plans/:planId/edit-plan", plansController.renderEditPlan);
router.post(
  "/plans/:id/like",
  authMiddleware.isAuthenticated,
  likesController.doLike
);

module.exports = router;
