const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const multer = require("multer");
const Category = require("../models/category");
const Brand = require("../models/brand");
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
  const category = new Category(
    _.pick(req.body, ["name", "description", "company"])
  );
  category.image = req.body.name;
  await category.save();

  res.status(200).send("Saved");
});

router.get("/", async (req, res) => {
  const result = await Category.find({ isDelete: false });

  const brand = [];
  result.find(ele => {
    brand.push(result.company);
  });

  res.status(200).send(result);
});

router.post("/brand/add", async (req, res) => {
  const brand = new Brand(_.pick(req.body, ["name"]));
  await brand.save();

  res.status(200).send("Done");
});

router.post("/delbrand", async (req, res) => {
  const id = req.body.id;
  const updateObj = { isDelete: true };

  Brand.findByIdAndUpdate(id, updateObj, { new: true }, function(err, model) {
    if (err) return res.status(500).send(err);
    res.send(model);
  });
});

router.get("/brand", async (req, res) => {
  const result = await Brand.find({ isDelete: false });

  res.status(200).send(result);
});

router.post("/delete", async (req, res) => {
  const id = req.body.id;
  const updateObj = { isDelete: true };

  Category.findByIdAndUpdate(id, updateObj, { new: true }, function(
    err,
    model
  ) {
    if (err) return res.status(500).send(err);
    res.send(model);
  });
});

module.exports = router;
