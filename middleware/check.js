const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/users");
const config = require("config");

async function validateJwt(token) {
  const id = jwt.decode(token, config.get("jwtPrivateKey"));
  const result = await User.find({ _id: id._id });
  if (result.length === 1) {
    return true;
  }
  return false;
}

module.exports = validateJwt;
