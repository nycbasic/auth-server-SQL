const express = require("express");
const passport = require("passport");
const router = express.Router();
const facebook = passport.authenticate("fb");
const facebookAuthenticated = passport.authenticate("fb", {
  successRedirect: "/success",
  failureMessage: "Incorrect Credentials!",
});
const auth = passport.authenticate(["jwtcookie", "google", "fb"], {
  session: false,
});

const {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete,
  checkUser,
  test,
} = require("../controllers/users");

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get("/test", facebook, test);

// Route: POST /api/users/v1/login
// Desc: User login endpoint without OAuth
// Access: PUBLIC
router.post("/login", userLogin);

// Facebook OAuth2.0
router.get("/login/facebook", facebook);
router.get("/auth/facebook/callback", facebook, (req, res) => {
  res.redirect("/success");
});

router.post("/auth/facebook/callback/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
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
router.delete("/delete/:userId", userDelete);

// Test function for middleware
function fbOAuth(req, res, next) {
  console.log(req.isAuthenticated());
}

module.exports = router;
