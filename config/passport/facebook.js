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
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName } = profile;
        const firstName = displayName.split(" ")[0];
        const lastName = displayName.split(" ")[1];

        try {
          const user = await User.findOrCreate({
            where: { facebook: profile.id },
            defaults: {
              firstName,
              lastName,
              facebook: id,
            },
          });
          return done(null, { fb: { accessToken, user } });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
