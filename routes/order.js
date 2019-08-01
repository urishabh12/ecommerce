const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const Order = require("../models/order");
const validateJwt = require("../middleware/check");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/add", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));
  const data = {
    product: req.body.product,
    user: id
  };
  const order = new Order(data);
  await order.save();

  return res.status(200).send(order);
});

router.get("/", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));
  const result = await Order.find({ user: id._id });

  if (!result.length) return res.send("No Orders");

  res.status(200).send(result);
});

router.get("/all", async (req, res) => {
  const result = await Order.find({});

  if (!result.length) return res.send("No Orders");

  return res.status(200).send(result);
});

router.post("/complete/:id", async (req, res) => {
  const id = req.params.id;
  const updateObj = { isComplete: true };

  Order.findByIdAndUpdate(id, updateObj, { new: true }, function(err, model) {
    if (err) return res.status(500).send(err);
    res.send(model);
  });
});

module.exports = router;
