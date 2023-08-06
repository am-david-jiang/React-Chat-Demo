const mongoose = require("mongoose");
const User = require("../model/User");
const { genPasswordHash } = require("../util/PasswordUtils");
const jwt = require("jsonwebtoken");
const generateJwt = require("../util/generateJwt");

require("dotenv").config();

async function signUp(req, res, next) {
  const form = req.body;
  const avatarFile = req.file.filename;

  // Generate Password Hash
  const { hash, salt } = genPasswordHash(form.password);

  try {
    // Create New User
    const user = await User.create({
      username: form.username,
      salt,
      hash,
      avatar: avatarFile,
    });

    // Generate JWT for new user and response with infomation
    // of user and token
    const token = generateJwt(res, user._id.toString());
    res.status(200).json({
      success: true,
      username: user.username,
      token,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(401);
    next(err);
  }
}

async function signIn(req, res) {
  const userId = req.userId;
  const { username } = req.body;

  try {
    // const token = jwt.sign({}, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });
    const token = generateJwt(res, userId);

    res.status(200).json({
      success: true,
      username,
      token,
      avatar: req.avatar
    });
  } catch (err) {
    res.status(401);
    next(err);
  }
}

function logout(req, res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logout Succeed" });
}

async function getUserProfile(req, res) {
  const { username, avatar } = req.user;
  res.status(200).json({ success: true, username, avatar });
}

module.exports = {
  signUp,
  signIn,
  logout,
  getUserProfile,
};
