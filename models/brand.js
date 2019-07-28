const Joi = require("joi");
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Brand", brandSchema);
