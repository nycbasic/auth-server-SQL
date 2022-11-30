const express = require("express");
const passport = require("passport");
const router = express.Router();
const facebook = passport.authenticate("fb");
const google = passport.authenticate("google");

const {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete,
  checkUser,
  test,
} = require("../controllers/users");

passport.serializeUser((user, done) => {
  console.log("FROM PASSPORT SERIALIZE: ", user);
  // process.nextTick(function () {
  //   const { id, username, displayName } = user;
  //   done(null, { fb: { id, username, name: user.displayName } });
  // });
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

// Route: POST /api/users/v1/login
// Desc: User login endpoint without OAuth
// Access: PUBLIC
router.post("/login", userLogin);

// Facebook OAuth2.0
router.get("/login/facebook", facebook);
router.get("/auth/facebook/callback", facebook, (req, res) => {
  console.log("FROM THE FACEBOOK CALLBACK ROUTE: ", req.user);
  // res.user = req.user;
  return res.json({
    message: "Successfully logged in!",
  });
});

router.post("/auth/facebook/callback/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Google OAuth2.0
router.get("/login/google", google);
router.get("/auth/google/callback", google, (req, res, next) => {
  console.log("FROM GOOGLE CALLBACK ROUTE: ", req.session);
  return res.json({
    message: "Successful Google login!",
  });
});

// Route: POST /api/users/v1/signup
// Desc: User sign-up endpoint
// Access: PUBLIC
router.post("/signup", userSignUp);

// Route: GET /api/users/v1/forgot
// Desc: Forgot password to check if the user email is in the db.
// Access: PUBLIC
router.get("/forgot", checkUser);

// Route: PATCH /api/users/v1/forgot/:token
// Desc: Forgot password endpoint for changing or updating password
// Accces: PUBLIC
router.patch("/forgot/:token", forgotPassword);

// Route: DELETE /api/users/v1/delete/:userId
// Desc: Delete user endpoint
// Access: PRIVATE
router.delete("/delete/:userId", facebook, userDelete);

// Test function for middleware
function fbOAuth(req, res, next) {
  console.log(req.isAuthenticated());
}

router.get("/test", facebook, (req, res) => {
  console.log(req.session);
});

module.exports = router;
