const express = require("express");
const router = express.Router();

const {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete,
} = require("../helpers/api/users");

// Route: POST /api/users/v1/login
// Desc: User login endpoint
// Access: PUBLIC
router.post("/login", userLogin);

// Route: POST /api/users/v1/signup
// Desc: User sign-up endpoint
// Access: PUBLIC
router.post("/signup", userSignUp);

// Route: GET /api/users/v1/forgot
// Desc: Forgot password to check if the user email is in the db.
// Access: PUBLIC
router.get("/forgot", forgotPassword);

// Route: PATCH /api/users/v1/forgot/:token
// Desc: Forgot password endpoint for changing or updating password
// Accces: PUBLIC
router.patch("/forgot/:token", forgotPassword);

// Route: DELETE /api/users/v1/delete/:userId
// Desc: Delete user endpoint
// Access: PRIVATE
router.delete("/delete/:userId", userDelete);

module.exports = router;
