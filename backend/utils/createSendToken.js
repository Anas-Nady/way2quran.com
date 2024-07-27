const jwt = require("jsonwebtoken");

const signToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.isAdmin);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION",
  };

  res.cookie("jwt", token, cookieOptions);
  res.locals.isAdmin = user.isAdmin;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

module.exports = createSendToken;
