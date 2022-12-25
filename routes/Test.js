const express = require("express");
const router = express.Router();
const auth = require("../middleware");
const { success } = require("../controllers/test");

router.get("/success", auth, success);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt").clearCookie("payload");
  req.logOut((err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.status(200).json({
    authenticated: false,
  });
});

module.exports = router;
