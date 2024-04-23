const mongoose = require("mongoose");

const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");

const restaurantSchema = new mongoose.Schema({
  restaurantname: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    trim: true,
  },
  email: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, REQUIRED_FIELD_ERROR],
    minLength: [8, "Password must be at least 8 characters long"],
    // match: [
    //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    //   "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long",
    // ],
  },
});

const Restaurant = mongoose.model("Restaurant", userSchema);
module.exports = Restaurant;
