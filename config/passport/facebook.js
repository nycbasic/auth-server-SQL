const passport = require("passport");
const FbStrategy = require("passport-facebook").Strategy;
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");

module.exports = (passport) => {
  passport.use(
    "fb",
    new FbStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL:
          "http://localhost:3001/api/auth/v1/facebook/callback",
        profileFields: ["email", "displayName", "picture.type(small)"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        const firstName = name.split(" ")[0];
        const lastName = name.split(" ")[1];

        try {
          const user = await Users.findOrCreate({
            where: { email },
            defaults: {
              firstName,
              lastName,
              email,
              accessToken,
              validated: true
            },
          });
          const { dataValues } = user[0];
          return done(null, dataValues);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
