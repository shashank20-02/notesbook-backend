const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Async = require("./Async");
const jwt = require("jsonwebtoken");
exports.isAuthincatedUser = Async(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("please login to Continue"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});
