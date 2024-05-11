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
    default:
      "https://img.freepik.com/foto-gratis/vista-superior-mesas-comedor-comida_23-2150157827.jpg?t=st=1715416294~exp=1715419894~hmac=5b8e5b8fc9f5d8640d68d0aeb5d7b7987b277ecb3eeb5e27e607070755971c04&w=1800",
  },
  comments: {
    type: String,
  },
  url: {
    type: String,
  },
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  maxParticipants: {
    type: Number,
    required: [true, REQUIRED_FIELD_ERROR],
    min: 1, // El número máximo de participantes debe ser al menos 1
  },
  currentParticipants: {
    type: Number,
    default: 0,
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
