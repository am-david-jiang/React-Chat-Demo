const User = require("../model/User");
const { onlineUserList } = require("../router/Socket");

async function isUserOnline(req, res, next) {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(`User (${username}) is not found`);
    }
    if (!onlineUserList.current.find((user) => user.username === username)) {
      throw new Error(`User (${username}) is not online`);
    }
    res.json({ success: true, username: user.username, avatar: user.avatar });
  } catch (err) {
    res.status(404);
    next(err);
  }
}

async function getUserAvatar(req, res, next) {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(`User (${username}) is not found`);
    }
    res.json({ success: true, avatar: user.avatar });
  } catch (err) {
    res.status(404);
    next(err);
  }
}

module.exports = { isUserOnline, getUserAvatar };
