const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const User = require("../model/User");

require("dotenv").config();

function cookieExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }

  return token;
}

const opt = {};
opt.secretOrKey = process.env.JWT_SECRET;
opt.jwtFromRequest = cookieExtractor;

passport.use(
  new JwtStrategy(opt, function (jwt_payload, done) {
    User.findById(jwt_payload.userId, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
