const express = require("express");
const passport = require("passport");
const router = express.Router();
const auth = require("../middleware");
const jwt = passport.authenticate("jwtcookie");
const fb = passport.authenticate("fb");
const { success, testPersist } = require("../controllers/test");

router.get("/success", auth, jwt, success);
router.get("/test", auth, jwt, testPersist);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt").clearCookie("payload");
  req.logOut((err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.status(200).json({
    loggedOut: true,
  });
});

module.exports = router;
