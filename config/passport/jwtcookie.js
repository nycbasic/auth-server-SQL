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
    new JwtStrategy(token, async (payload, done) => {
      console.log("JWT STRATEGY FIRES!~~!")
      try {
        const user = await User.findByPk(payload.id);
        if (user) {
          const { id, firstName, lastName, email } = user;
          return done(null, { id, firstName, lastName, email });
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
