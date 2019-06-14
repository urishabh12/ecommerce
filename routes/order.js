const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const Order = require("../models/order");
const validateJwt = require("../middleware/check");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/add", async (req, res) => {
    const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));
    const data = {
        product: req.body.product,
        user: id
    }
    const order = new Order(data);
    await order.save();

    return res.send(order);
});

router.post("/", async (req, res) => {
    const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));
    const result = Order.find({user: "5d021e4b8309ea11ae1ac164"});

    if(!result.length) return res.status(404).send(id._id);

    res.send(result);
});

module.exports = router;