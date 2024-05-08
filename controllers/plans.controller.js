// metido a copia/pega , revisar y modificar

const createError = require("http-errors");
const Like = require("../models/like.model");
const plan = require("../models/plans.model");
const cuisineTypeArr = require("../constants/cuisineTypes");

module.exports.getPlans = (req, res, next) => {
  const { cuisineType, maxPrice, minPrice, location } = req.query;

  const query = {};

  if (cuisineType) {
    query.cuisineType = cuisineType;
  }

  if (minPrice) {
    query.prices = { $gte: minPrice };
  }

  if (maxPrice) {
    query.price = { $lte: maxPrice };
  }

  if (location) {
    query.location = location;
  }

  plan
    .find(query)
    .populate("location")
    .then((plans) => {
      if (location) {
        return location.findById(location).then((locationDB) => {
          if (locationDB) {
            res.render("plans/list", {
              plans,
              location,
              date,
            });
          } else {
            res.render("plans/list", { plans, cuisineType: cuisineTypeArr });
          }
        });
      } else {
        res.render("plans/list", { plans, cuisineType: cuisineTypeArr });
      }
    })
    .catch((err) => next(err));
};

module.exports.getPlan = (req, res, next) => {
  plan
    .findById(req.params.id)
    .populate("cuisineType")
    .populate({
      path: "likes",
      populate: { path: "user", select: "email avatar" },
    })
    .then((plan) => {
      if (!plan) {
        next(createError(404, "Plan no encontrado"));
      }

      if (req.currentUser) {
        return Like.findOne({
          user: req.currentUser._id,
          plan: req.params.id,
        }).then((like) => {
          if (like) {
            res.render("plans/detail", { plan, liked: Boolean(like) });
          } else {
            res.render("plans/detail", { plan });
          }
        });
      } else {
        res.render("plans/detail", { plan });
      }
    })
    .catch((err) => next(err));
};

module.exports.renderCreatePlan = (req, res, next) => {
  res.render("plans/create-plan", { cuisineType: cuisineTypeArr });
};

module.exports.createPlan = (req, res, next) => {
  const {
    planname,
    date,
    location,
    description,
    price,
    cuisineType,

    comments,
    url,
    maxParticipants,
  } = req.body;

  let image;
  if (req.file) {
    image = req.file.path;
  }
  console.log(maxParticipants);
  if (!maxParticipants || isNaN(maxParticipants) || maxParticipants <= 0) {
    return next(
      createError(
        400,
        "El número máximo de participantes debe ser un número válido y mayor que cero"
      )
    );
  }
  const newPlan = new plan({
    planname,
    date,
    location,
    description,
    price,
    cuisineType,
    image,
    comments,
    url,
    maxParticipants,
    creator: req.currentUser._id,
  });

  newPlan
    .save()
    .then(() => {
      res.redirect("/plans"); // Redirige a la lista de planes después de la creación
    })
    .catch((err) => next(err));
};
module.exports.likePlan = (req, res, next) => {
  Plan.findById(req.params.id)
    .then((plan) => {
      if (!plan) {
        return next(createError(404, "Plan no encontrado"));
      }

      plan.participantsCount += 1;

      if (plan.participantsCount >= plan.maxParticipants) {
        plan.remove();

        return res.redirect("/plans");
      }

      return plan.save();
    })
    .then(() => {
      res.redirect(`/plans/${req.params.id}`);
    })
    .catch((err) => next(err));
};
