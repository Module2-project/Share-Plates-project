const Like = require("../models/like.model");
const Plan = require("../models/plans.model");
const createError = require("http-errors");

module.exports.doLike = async (req, res, next) => {
  try {
    // Buscar el like existente para el usuario y el plan
    const like = await Like.findOne({
      user: req.currentUser._id,
      plan: req.params.id,
    });

    // Encontrar el plan correspondiente
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return next(createError(404, "Plan no encontrado"));
    }

    // Si el like existe, eliminarlo y actualizar el contador de participantes
    if (like) {
      await Like.findByIdAndDelete(like._id);
      plan.currentParticipants -= 1;
    } else {
      // Si no existe, crear un nuevo like y actualizar el contador de participantes
      await Like.create({ user: req.currentUser._id, plan: req.params.id });
      plan.currentParticipants += 1;
    }

    // Guardar el plan actualizado
    await plan.save();

    res.redirect(`/plans/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};
