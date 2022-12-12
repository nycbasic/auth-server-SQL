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
      try {
         const user = await User.findByPk(payload.id);
         if(user) {
          const {id, firstName, lastName, email} = user;
          console.log("JWT STRAT USER FOUND!")
          return done(null, {id, firstName, lastName, email})
         } else {
          console.log("USER NOT FOUND")
          return done(null, false)
         }
      }catch(err) {
        console.log(err)
      }
    })
  );
};
