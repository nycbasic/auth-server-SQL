const GoogleStrategy = require("passport-google-oauth2").Strategy;
const Users = require("../../models/Users");

module.exports = (passport) => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/api/users/v1/auth/google/callback",
        passReqToCallback: true,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      },
      async (req, accessToken, refreshToken, user, done) => {
        const { given_name, family_name, email } = user;
        try {
          const user = await Users.findOrCreate({
            where: { email },
            defaults: {
              firstName: given_name,
              lastName: family_name,
              email,
              accessToken,
              validated: true,
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
