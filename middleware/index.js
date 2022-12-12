const passport = require("passport");
const test = passport.authenticate("jwtcookie");
const auth = (req, res, next) => {
  console.log("FROM AUTH MIDDLEWARE: ", test());
  console.log("FROM AUTH MIDDLEWARE: ", req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({
    message: "User not authorized!",
  });
};

module.exports = auth;
