const Like = require("../models/like.model");

module.exports.doLike = (req, res, next) => {
  Like.findOne({ user: req.currentUser._id, book: req.params.id })
    .then((like) => {
      if (like) {
        return Like.findByIdAndDelete(like._id).then(
          res.redirect(`/plans/${req.params.id}`)
        );
      } else {
        return Like.create({
          user: req.currentUser._id,
          plan: req.params.id,
        }).then(res.redirect(`/plans/${req.params.id}`));
      }
    })
    .catch((err) => next(err));
};
