const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const Reward = require("../models/reward");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/get", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));
  const result = await Reward.find({ user: req.params.id });

  if (!result.length) return res.status(400).send("Not a user");

  return res.status(200).send(result[0]);
});

router.get("/all", async (req, res) => {
  let result = await Reward.find({});

  return res.status(200).send(result);
});

module.exports = router;
