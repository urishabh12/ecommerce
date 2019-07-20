const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const multer = require("multer");
const { Product, productSchema } = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
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
  let result = await Category.find({
    name: req.body.category,
    company: { $all: [req.body.company] }
  });
  if (!result.length) return res.status(500).send("Category or Company Error");

  const product = new Product(
    _.pick(req.body, ["name", "category", "company", "quantity", "price"])
  );
  product.image = req.body.name;
  await product.save();

  res.send(product);
});

router.get("/", async (req, res) => {
  let result = await Product.find({
    category: req.body.category
    //company: req.body.company
  });
  if (!result.length) res.status(404).send("No products to show");

  res.send(result);
});

module.exports = router;
