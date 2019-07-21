const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
var multer = require("multer");
const mongoose = require("mongoose");
const users = require("./routes/users");
const category = require("./routes/category");
const product = require("./routes/product");
const order = require("./routes/order");
const advertisement = require("./routes/advertisement");
const cart = require("./routes/cart");
const wishlist = require("./routes/wishlist");
const db = "mongodb://localhost/ecommerce";
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Could not connect MongoDB", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", users);
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/advertisement", advertisement);
app.use("/api/cart", cart);
app.use("/api/wishlist", wishlist);

app.get("/getimage", (req, res) => {
  res.sendFile(__dirname + "/Images/" + req.body.image);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}..`));
