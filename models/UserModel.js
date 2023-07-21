const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    minLength: [3, "Name should be at least 3 letters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: [true, "Please enter a valid Email"],
    validate: [Validator.isEmail, "Please enter a valid Email Address"],
  },
  avatar: {
    public_id: {
      type: String,
      required: [true, "Please enter the public id for the avatar"],
    },
    url: {
      type: String,
      required: [true, "Please enter the url for the avatar"],
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [8, "Password should be atleast 8 letters"],
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.ComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
