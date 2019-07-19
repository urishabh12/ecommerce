const Joi = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: String
  },
  products: {
    type: Array
  }
});

module.exports = mongoose.model("Cart", cartSchema);
