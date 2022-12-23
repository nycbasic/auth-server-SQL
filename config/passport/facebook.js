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
        profileFields: ["email", "displayName", "picture.type(small)"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        const firstName = name.split(" ")[0];
        const lastName = name.split(" ")[1];
        console.log("FROM FACEBOOK STRATEGY: ", refreshToken);

        try {
          const user = await Users.findOrCreate({
            where: { email },
            defaults: {
              firstName,
              lastName,
              email,
              facebook: accessToken,
            },
          });
          console.log(user[0].dataValues)
          // const {dataValues} = user;
          // console.log("FROM FB STRATEGY", refreshToken)
          // return done(null, { fb: {dataValues} });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
