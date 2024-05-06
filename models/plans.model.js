const mongoose = require("mongoose");

const Like = require("../models/like.model");
const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");
const cuisineTypes = require("../constants/cuisineTypes");

const planSchema = new mongoose.Schema({
  planname: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    trim: true,
  },
  date: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    trim: true,
  },
  location: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    trim: true,
  },
  description: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    trim: true,
  },
  price: {
    type: [Number],
    required: [true, REQUIRED_FIELD_ERROR],
    maxLength: 2,
    minLength: 2,
  },
  cuisineType: {
    type: [String],
    required: [true, REQUIRED_FIELD_ERROR],
    enum: cuisineTypes, //en la carpeta de constantes están enumerados todos los tipos
  },
  image: {
    type: String,
  },
  comments: {
    type: String,
  },
  url: {
    type: String,
  },
});

planSchema.virtual("likes", {
  ref: "Like",
  foreignField: "plan",
  localField: "_id",
  justOne: false,
});

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
