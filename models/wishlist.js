const Joi = require("joi");
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: String
  },
  products: {
    type: Array
  }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
