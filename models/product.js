const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  company: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  image: {
    type: String
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

exports.Product = mongoose.model("product", productSchema);
exports.productSchema = productSchema;
