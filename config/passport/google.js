const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const User = require("../../models/Users");

module.exports = (passport) => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/api/users/v1/auth/google/callback",
        passReqToCallback: true,
        scope: ["profile"],
      },
      (req, accessToken, refreshToken, user, done) => {
        console.log(accessToken);
        // profile param will fill information about the user
        // User.findOrCreate({ where: { id: profile.id } }, (err, user) => {
        //   return done(err, user);
        // });
        return done(null, user);
      }
    )
  );
};
