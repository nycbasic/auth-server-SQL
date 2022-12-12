const e = require("express");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const facebookLogin = passport.authenticate("fb", { scope: "email" });
const facebookCallback = passport.authenticate("fb", {
  successRedirect: "http://localhost:3001/test",
});
const jwt = passport.authenticate('jwtcookie');
const google = passport.authenticate("google");

const {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete,
  checkUser,
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
  console.log("FROM PASSPORT DESERIALIZEUSER: ", user)
  return done(null, user);
});

// Route: POST /api/users/v1/login
// Desc: User login endpoint without OAuth
// Access: PUBLIC
router.post("/login", userLogin, jwt, (req, res) => {
  console.log("FROM LOGIN CONTROLLER", req.isAuthenticated())
});

// Facebook OAuth2.0
router.get("/login/facebook", facebookLogin);
router.get("/auth/facebook/callback", facebookCallback);

router.post("/auth/facebook/logout", (req, res, next) => {
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
router.delete("/delete/:userId", userDelete);

module.exports = router;
