const sendToken = (user, statusCode, res) => {
  const token = user.getToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    sameSite: process.env.NODE_ENV === "Development" ? "Lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
