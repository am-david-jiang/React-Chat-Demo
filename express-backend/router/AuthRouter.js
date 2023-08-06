const express = require("express");
const passport = require("passport");

const {
  checkIsDuplicated,
  checkUsernamePassword,
  checkIsJwtValid,
} = require("../middleware/AuthMiddleware");
const {
  signUp,
  signIn,
  logout,
  getUserProfile,
} = require("../controller/AuthController");

const upload = require("../config/multer");

const router = express.Router();

router.post("/signup", upload.single("avatar"), checkIsDuplicated, signUp);
router.post("/signin", checkUsernamePassword, signIn);
router.get("/logout", logout);
router.get("/userprofile", checkIsJwtValid, getUserProfile);

module.exports = router;
