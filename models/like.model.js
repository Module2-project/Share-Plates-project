const mongoose = require("mongoose");
const User = require("./user.model");
const Plan = require("./plans.model");

const likeSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: Plan.modelName,
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
