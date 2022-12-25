const passport = require("passport");

const auth = (req, res, next) => {
  const { jwt, payload } = req.cookies;

  const authenticated = {
    oauth: req.isAuthenticated() && req.user && jwt && payload,
    local: !(req.isAuthenticated() && req.user) && jwt && payload,
  };

  if (authenticated.oauth) {
    return next();
  } else if (authenticated.local) {
    passport.authenticate("jwtcookie", (err, user) => {
      if (err) {
        return res.sendStatus(400);
      }
      req.user = user;
      return next();
    })(req, res, next);
  } else {
    return res.sendStatus(401);
  }
};

module.exports = auth;
