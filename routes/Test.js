const express = require("express");
const passport = require("passport");
const router = express.Router();
const auth = require("../middleware");
const jwt = passport.authenticate("jwtcookie");
const fb = passport.authenticate("fb");
const { success, testPersist } = require("../controllers/test");


router.get("/success", auth, success);
router.get("/test", auth, testPersist);

module.exports = router;
