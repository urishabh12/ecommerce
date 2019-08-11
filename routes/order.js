const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const Order = require("../models/order");
const { Product, productSchema } = require("../models/product");
const Cart = require("../models/cart");
const Reward = require("../models/reward");
const validateJwt = require("../middleware/check");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

async function adding(product, id, ord) {
  for (var i = 0; i < product.orderList.length; i++) {
    let temp = product.orderList[i];

    await Product.findOne({ _id: temp._id }, (err, doc) => {
      doc.quantity = doc.quantity - temp.quantity;
      doc.save();
    });
  }

  Cart.updateOne({ user: id }, { $set: { products: [] } }, (err, doc) => {
    if (err) return res.status(500).send(err);
  });

  Reward.updateOne(
    { user: id },
    { $inc: { count: -product.rewardPointDiscount } },
    (err, doc) => {
      console.log(doc);
    }
  );

  let rew = Math.floor((product.totalPrice * 10) / 100);

  Reward.updateOne({ user: id }, { $inc: { count: rew } }, (err, doc) => {
    console.log(doc);
  });

  Reward.updateOne(
    { user: 1 },
    {
      $push: {
        history: { order: ord, used: product.rewardPointDiscount, gained: rew }
      }
    },
    (err, doc) => {
      console.log(doc);
    }
  );
}

router.post("/add", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));
  req.body.product = JSON.parse(req.body.product);
  const data = {
    product: req.body.product,
    user: id
  };
  const order = new Order(data);
  await order.save();

  res.status(200).send(order);
  adding(req.body.product, id, order._id);
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
