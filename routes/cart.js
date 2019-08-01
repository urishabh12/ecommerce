const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const Cart = require("../models/cart");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));

  let result = await Cart.find({ user: id });
  if (!result.length) {
    const cart = await new Cart(_.pick(req.body, ["products"]));
    cart.user = id;
    await cart.save();
    return res.status(200).send("Done");
  }

  result[0].products.find(ele => {
    if (ele === req.body.products) {
      return res.status(400).send("Already in Cart");
    }
  });

  await Cart.updateOne(
    { user: id },
    { $push: { products: req.body.products } },
    function(err, raw) {
      if (err) return handleError(err);
      console.log("The raw response from Mongo was ", raw);
      return res.send(raw);
    }
  );
});

router.get("/get", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));

  let result = await Cart.find({ user: id });

  return res.send(200).send(result.products);
});

router.get("/all", async (req, res) => {
  let result = await Cart.find({});

  return res.send(200).send(result);
});

module.exports = router;
