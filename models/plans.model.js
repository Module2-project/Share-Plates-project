const mongoose = require("mongoose");

const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");

const User = require("./user.model");

const planSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
  },
  description: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
  },

  Price: {
    type: Number,
    required: [true, REQUIRED_FIELD_ERROR],
  },

  // img
});
