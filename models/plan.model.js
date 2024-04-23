const mongoose = require("mongoose");

const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");
const cuisineTypes = require("../constants/cuisineTypes");

const userSchema = new mongoose.Schema({
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
    type: Number,
    required: [true, REQUIRED_FIELD_ERROR],
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
