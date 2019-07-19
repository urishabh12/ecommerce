const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const _ = require("lodash");
const { User, validate } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Images");
  },

  filename: function(req, file, callback) {
    callback(null, req.body.email + "_" + file.fieldname);
  }
});

var upload = multer({
  storage: Storage
});

var cpUpload = upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "electricity", maxCount: 1 },
  { name: "pan", maxCount: 1 },
  { name: "driving", maxCount: 1 }
]);

router.post("/registration", cpUpload, async (req, res) => {
  //const { error } = validate(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Exists");

  let docs = {
    aadhar: req.body.email + "_" + "aadhar",
    electricity: req.body.email + "_" + "electricity",
    pan: req.body.email + "_" + "pan",
    driving: req.body.email + "_" + "driving"
  };

  user = new User(_.pick(req.body, ["name", "mobile", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.documentLink = docs;
  await user.save();

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res
    .header("auth-token", token)
    .send(_.pick(user, ["name", "email", "mobile"]));
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Wrong ID or Password");

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send("Wrong ID or Password");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res.header("auth-token", token).send("Login Done");
});

router.post("/flogin", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ email: req.body.email, name: req.body.name });

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res.header("auth-token", token).send("Login Done");
});

module.exports = router;