const config = require("config");
const { User, validate } = require("./models/users");
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
const coupon = require("./routes/coupon");
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
app.use("/api/coupon", coupon);

app.get("/getimage/:image", (req, res) => {
  res.contentType("image/png");
  res.status(200).sendFile(__dirname + "/Images/" + req.params.image);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/js/:name", (req, res) => {
  res.status(200).sendFile(__dirname + "/js/" + req.params.name);
});

app.get("/css/:name", (req, res) => {
  res.status(200).sendFile(__dirname + "/css/" + req.params.name);
});

app.post("/check", async (req, res) => {
  let id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));
  let temp = id._id;
  const result = await User.find({ _id: temp });
  if (result.length) {
    res.status(200).send("SUCCESS");
  }
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/html/dashboard.html");
});

app.get("/users", (req, res) => {
  res.sendFile(__dirname + "/html/users.html");
});

app.get("/products", (req, res) => {
  res.sendFile(__dirname + "/html/products.html");
});

app.get("/advertise", (req, res) => {
  res.sendFile(__dirname + "/html/advertise.html");
});

app.get("/order", (req, res) => {
  res.sendFile(__dirname + "/html/order.html");
});

app.get("/category", (req, res) => {
  res.sendFile(__dirname + "/html/category.html");
});

app.get("/wishlist", (req, res) => {
  res.sendFile(__dirname + "/html/wishlist.html");
});

app.get("/cart", (req, res) => {
  res.sendFile(__dirname + "/html/cart.html");
});

app.get("/brand", (req, res) => {
  res.sendFile(__dirname + "/html/brand.html");
});

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on ${port}..`));
