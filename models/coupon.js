const Joi = require("joi");
const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String
  },
  percentage: {
    type: Number
  },
  max: {
    type: Number
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Coupon", couponSchema);
