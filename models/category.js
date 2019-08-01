const Joi = require("joi");
const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Category", catSchema);
