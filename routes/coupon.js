const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const Coupon = require("../models/coupon");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  const coupon = await new Coupon(
    _.pick(req.body, ["name", "percentage", "max"])
  );
  await coupon.save();

  res.status(200).send({ message: "Done" });
});

router.get("/get/:name", async (req, res) => {
  const result = await Coupon.find({ name: req.params.name, isDelete: false });

  if (!result.length) return res.status(400).send("Not a coupon");

  return res.status(200).send(result[0]);
});

router.get("/all", async (req, res) => {
  let result = await Coupon.find({ isDelete: false });

  return res.status(200).send(result);
});

router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const updateObj = { isDelete: true };

  Coupon.findByIdAndUpdate(id, updateObj, { new: true }, function(err, model) {
    if (err) return res.status(500).send(err);
    res.send(model);
  });
});

module.exports = router;
