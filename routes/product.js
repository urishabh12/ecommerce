const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const multer = require("multer");
const { Product, productSchema } = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const validateJwt = require("../middleware/check");
const express = require("express");
const router = express.Router();

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Images");
  },

  filename: function(req, file, callback) {
    callback(null, req.body.name);
  }
});

var upload = multer({
  storage: Storage
});

router.post("/add", upload.single("image", 1), async (req, res) => {
  console.log(req.data);
  if (await validateJwt(req.get("auth-token"))) {
    const product = new Product(
      _.pick(req.body, ["name", "category", "company", "quantity", "price"])
    );
    product.image = req.body.name;
    await product.save();

    return res.status(200).send("Added");
  }

  return res.send("Error");
});

router.get("/cat/:category", async (req, res) => {
  let result = await Product.find({
    category: req.params.category
    //company: req.body.company
  });
  if (!result.length) res.status(404).send("No products to show");

  res.status(200).send(result);
});

router.get("/brand/:brand", async (req, res) => {
  let result = await Product.find({
    company: req.params.brand
  });
  if (!result.length) res.status(404).send("No products to show");

  res.status(200).send(result);
});

router.get("/all", async (req, res) => {
  if (await validateJwt(req.get("auth-token"))) {
    let result = await Product.find({ isDelete: false });
    let cat = await Category.find({ isDelete: false });
    result.push(cat);
    if (!result.length) return res.status(404).send("No products to show");
    return res.send(result);
  }

  return res.status(500).send({ message: "access denied" });
});

module.exports = router;
