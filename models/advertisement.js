const Joi = require("joi");
const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
  image: {
    type: String
  },
  product: {
    type: Array
  },
  title: {
    type: String
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Advertisement", advertisementSchema);
