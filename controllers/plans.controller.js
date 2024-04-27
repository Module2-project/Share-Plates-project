// metido a copia/pega , revisar y modificar

const createError = require("http-errors");

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
              genres: genresArr,
              author: authorDB.name,
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
  Plan.findById(req.params.id)
    .populate("cuisineType")
    .populate({
      path: "likes",
      populate: { path: "user", select: "email avatar" },
    })
    .then((book) => {
      if (!book) {
        next(createError(404, "Plan no encontrado"));
      }

      if (req.currentUser) {
        return Like.findOne({
          user: req.currentUser._id,
          book: req.params.id,
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
