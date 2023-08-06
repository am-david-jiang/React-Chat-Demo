const express = require("express");

const { checkIsJwtValid } = require("../middleware/AuthMiddleware");
const { isUserOnline, getUserAvatar } = require("../controller/UserController");

const router = express.Router();

router.get("/online", checkIsJwtValid, isUserOnline);
router.get("/avatar", checkIsJwtValid, getUserAvatar);

module.exports = router;
