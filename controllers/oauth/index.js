const passport = require("passport");
const { jwtCookie } = require("../../helpers");
// Facebook OAuth2.0
const facebook = (req, res, next) => {
  passport.authenticate("fb", { scope: ["email"] }, async (err, user) => {
    if (err) return res.sendStatus(400);
    jwtCookie(user, req, res, next);
  })(req, res, next);
};

// Google OAuth2.0
const google = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err) return res.sendStatus(400);
    jwtCookie(user, req, res, next);
  })(req, res, next);
};

module.exports = {
  google,
  facebook,
};
