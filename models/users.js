const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  emailIsVerified: {
    type: Boolean,
    default: false
  },
  mobileIsVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: Array,
    minlength: 10,
    maxlength: 20
  },
  documentLink: {
    type: String
  },
  profileLink: {
    type: String
  },
  createdBy: {
    type: String
  },
  modifiedBy: {
    type: String
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(30)
      .required(),
    mobile: Joi.number()
      .min(1000000000)
      .max(9999999999)
      .required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
