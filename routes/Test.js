const express = require("express");
const passport = require("passport");
const router = express.Router();
const auth = require("../middleware");
const jwt = passport.authenticate("jwtcookie");
const fb = passport.authenticate("fb");
const { success, testPersist } = require("../controllers/test");

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

router.get("/success", auth, success);
router.get("/test", testPersist);

module.exports = router;
