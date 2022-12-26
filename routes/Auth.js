const express = require("express");
const router = express.Router();

const {
  userLogin,
  userSignUp,
  forgotPassword,
  checkUser,
} = require("../controllers/auth");

const { facebook, google } = require("../controllers/oauth");

// Route: POST /api/users/v1/login
// Desc: User login endpoint without OAuth
// Access: PUBLIC
router.post("/login", userLogin);

// Facebook OAuth2.0
router.get("/login/facebook", facebook);
router.get("/facebook/callback", facebook);

// Google OAuth2.0
router.get("/login/google", google);
router.get("/google/callback", google);

// Route: POST /api/users/v1/signup
// Desc: User sign-up endpoint
// Access: PUBLIC
router.post("/signup", userSignUp);



module.exports = router;
