const Joi = require("joi");
const mongoose = require("mongoose");
const {Product, productSchema} = require("../models/product");
const Users = require("../models/users");

const orderSchema = new mongoose.Schema({
    product: productSchema,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    time: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model("order", orderSchema);