const Joi = require("joi");
const mongoose = require("mongoose");
const Users = require("../models/users");

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  time: {
    type: Date,
    default: Date.now
  },
  isComplete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("order", orderSchema);
