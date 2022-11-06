const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/Users");

const extractJwtCookie = (req) => {
  try {
    const { jwtheader, payload } = req.cookies;
    const token = `${jwtheader.header}.${payload}.${jwtheader.signature}`;
    return token;
  } catch (err) {
    return null;
  }
};

const token = {
  jwtFromRequest: extractJwtCookie,
  secretOrKey: process.env.SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(token, (payload, done) => {
      User.findByPk(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return err;
        });
    })
  );
};
