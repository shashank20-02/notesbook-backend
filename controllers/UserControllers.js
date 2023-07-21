const Async = require("../middlewares/Async");
const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../middlewares/SendToken");
exports.RegisterUser = Async(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password doesn't matched", 500));
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sample url",
    },
  });

  sendToken(user, 201, res);
});

exports.LoginUser = Async(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter correct Credentails", 500));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Please enter correct Credentails", 500));
  }

  const Auth = await user.ComparePassword(password);
  if (!Auth) {
    return next(new ErrorHandler("Please enter correct Credentails", 500));
  }

  sendToken(user, 200, res);
});

exports.GetUserDetails = Async(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User doesn't exists", 500));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

exports.UpdateUser = Async(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

exports.UpdatePassword = Async(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please enter all enteries to continue"));
  }
  const user = await User.findById(req.user.id).select("+password");
  const isAuth = await user.ComparePassword(oldPassword);
  console.log(user);
  if (!isAuth) {
    return next(new ErrorHandler("Password doesn't matches", 403));
  }
  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("Password doesn't matches", 403));
  }

  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    user,
  });
});

exports.LogoutUser = Async(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "Development" ? "Lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
  });
  res.status(200).json({ success: true, message: "Logged out Successfully" });
});
