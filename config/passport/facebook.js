const FbStrategy = require("passport-facebook").Strategy;
const Users = require("../../models/Users");

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
          const user = await Users.findOrCreate({
            where: { facebook: accessToken },
            defaults: {
              firstName,
              lastName,
              facebook: accessToken,
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
