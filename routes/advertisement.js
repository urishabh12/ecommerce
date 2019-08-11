const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const _ = require("lodash");
const Advertisement = require("../models/advertisement");
const { Product, productSchema } = require("../models/product");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Images");
  },

  filename: function(req, file, callback) {
    callback(null, req.body.titlereq.replace(" ", "_"));
  }
});

var upload = multer({
  storage: Storage
});

router.post("/add", upload.single("image", 1), async (req, res) => {
  let result = await Advertisement.find({
    title: req.body.title,
    isDelete: false
  });

  if (result.length) return res.send("Advertisement already exists");

  let temp = [];

  for (var i = 0; i < req.body.product.length; i++) {
    temp.push(JSON.parse(req.body.product[i]));
  }

  const advertisement = new Advertisement(_.pick(req.body, ["title"]));
  advertisement.image = req.body.titlereq.replace(" ", "_");
  advertisement.product = temp;
  await advertisement.save();

  return res.status(200).send(advertisement);
});

router.get("/get", async (req, res) => {
  let result = await Advertisement.find({ isDelete: false });

  return res.status(200).send(result);
});

router.get("/web", async (req, res) => {
  let result = await Advertisement.find({ isDelete: false });

  let product = await Product.find({ isDelete: false });
  result.push(product);

  return res.status(200).send(result);
});

router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const updateObj = { isDelete: true };

  Advertisement.findByIdAndUpdate(id, updateObj, { new: true }, function(
    err,
    model
  ) {
    if (err) return res.status(500).send(err);
    res.status(200).send(model);
  });
});

module.exports = router;
