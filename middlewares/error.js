const Errorhandler = require("../utils/ErrorHandler");
module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid : ${err.path}`;
  }

  if (err.code === 11000) {
    err.message = `User Already Exists.`;
    err.statuscode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    err.message = `Token generated is invalid Please Try again`;
    err.statuscode = 400;
  }

  if (err.name === "TokenExpiredError") {
    err.message = `Token Expired Please Try again`;
    err.statuscode = 400;
  }

  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};
