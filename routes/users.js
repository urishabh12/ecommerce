const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User, validate } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/registration", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Exists");

  user = new User(_.pick(req.body, ["name", "mobile", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("auth-token", token)
    .send(_.pick(user, ["name", "email", "mobile"]));
});

router.post("/login", async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send("Wrong ID or Password");

  const result = await bcrypt.compare(req.body.password, user.password);
  if(!result) return res.status(400).send("Wrong ID or Password");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res
    .header("auth-token", token)
    .send("Login Done");
});

module.exports = router;
