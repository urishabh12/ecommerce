const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const Category = require("../models/category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {

    const category = new Category(_.pick(req.body, ["name", "description", "company"]));
    await category.save();

    res.send("Saved");
});

router.get("/", async (req,res) => {

    const result = await Category.find({"isDelete":false});
    res.send(result);
});

router.post("/delete", async (req, res) => {

    const id = req.body.id;
    const updateObj = {isDelete: true};

    Category.findByIdAndUpdate(id, updateObj, {new:true}, function(err, model) {
        if(err) return res.status(500).send(err);
        res.send(model);
    });
    
});

module.exports = router;