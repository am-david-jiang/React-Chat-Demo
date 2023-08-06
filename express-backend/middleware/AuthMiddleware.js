const jwt = require("jsonwebtoken");

const User = require("../model/User");
const { verifyPassword } = require("../util/PasswordUtils");

require("dotenv").config();

async function checkIsDuplicated(req, res, next) {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (user) {
      res.status(401);
      throw new Error("User is already existed");
    } else {
      next();
    }
  } catch (err) {
    res.status(401);
    next(err);
  }
}

async function checkUsernamePassword(req, res, next) {
  // Extract the username and password
  const { username, password } = req.body;

  // Check whether the username or password is empty
  if (!username || !password) {
    res.status(401);
    return next(new Error("Username of Password Unfound!"));
  }

  try {
    // Check the existence of user that username points
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("The user is not existed");
    }

    // Check the validity of password
    if (!verifyPassword(password, user.hash, user.salt)) {
      throw new Error("The password is wrong");
    } else {
      req.userId = user._id.toString();
      req.avatar = user.avatar;
      next();
    }
  } catch (err) {
    // Pass error to error handler
    res.status(401);
    return next(err);
  }
}

async function checkIsJwtValid(req, res, next) {
  // const { username } = req.query;
  const token = req.cookies["jwt"];

  try {
    // Check if JWT token exists
    if (!token) throw new Error("No JWT token attached");

    // Check the validity of JWT token and extract the payload from token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists
    const user = await User.findById(userId);
    // Check whether username in request body is consist with the one that
    // JWT token is issued to
    if (!user) throw new Error("User is not existed");

    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    next(err);
  }
}

module.exports = { checkIsDuplicated, checkUsernamePassword, checkIsJwtValid };
