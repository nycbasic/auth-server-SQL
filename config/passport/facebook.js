const FbStrategy = require("passport-facebook").Strategy;
const User = require("../../models/Users");

module.exports = (passport) => {
  passport.use(
    "fb",
    new FbStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL:
          "http://localhost:3001/api/users/v1/auth/facebook/callback",
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log("FROM FB STRATEGY: ", accessToken);
        // User.findOrCreate({ where: { id: profile.id } }, (err, user) => {
        //   console.log("FROM FB STRATEGY: ", user);
        //   return cb(err, user);
        // });
        return cb(null, profile);
      }
    )
  );
};
