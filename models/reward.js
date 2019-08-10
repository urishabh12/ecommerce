const Joi = require("joi");
const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  user: {
    type: String
  },
  count: {
    type: Number
  },
  history: {
    type: Array
  }
});

module.exports = mongoose.model("Reward", rewardSchema);
