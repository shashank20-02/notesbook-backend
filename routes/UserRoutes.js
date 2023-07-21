const express = require("express");
const {
  RegisterUser,
  LoginUser,
  GetUserDetails,
  UpdateUser,
  LogoutUser,
  UpdatePassword,
} = require("../controllers/UserControllers");
const { isAuthincatedUser } = require("../middlewares/Auth");
const router = express.Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/me").get(isAuthincatedUser, GetUserDetails);
router.route("/update").put(isAuthincatedUser, UpdateUser);
router.route("/update/password").put(isAuthincatedUser, UpdatePassword);
router.route("/logout").delete(isAuthincatedUser, LogoutUser);
module.exports = router;
