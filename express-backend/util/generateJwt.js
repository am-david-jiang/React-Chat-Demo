const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateJwt(res, userId, expiresIn = "1d") {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return token;
}

module.exports = generateJwt;
