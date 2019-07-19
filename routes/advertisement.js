const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const _ = require("lodash");
const Advertisement = require("../models/advertisement");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Images");
  },

  filename: function(req, file, callback) {
    callback(null, req.body.title);
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
  if (!result.length) return res.send("Advertisement already exists");

  const advertisement = new Advertisement(
    _.pick(req.body, ["title", "product"])
  );
  advertisement.image = req.body.title;
  await advertisement.save();

  return res.send(advertisement);
});

router.get("/get", async (req, res) => {
  let result = await Advertisement.find({ isDelete: false });

  return res.send(result);
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
