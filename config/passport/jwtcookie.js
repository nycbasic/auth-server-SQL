const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../../models/Users");

const extractJwtCookie = (req) => {
  try {
    const { jwt } = req.cookies;
    return jwt;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const token = {
  jwtFromRequest: extractJwtCookie,
  secretOrKey: process.env.SECRET,
};

module.exports = (passport) => {
  passport.use(
    "jwtcookie",
    new JwtStrategy(token, (payload, done) => {
      User.findByPk(payload.id)
        .then((user) => {
          const { id, firstName, lastName, email } = user;
          if (user) {
            return done(null, { id, firstName, lastName, email });
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
