const passport = require("passport");
const jwt = require("jsonwebtoken");
// Facebook OAuth2.0
const facebookLogin = passport.authenticate("fb", { scope: "email" });
const facebookCallback = passport.authenticate("fb", {
  scope: ["email"],
});

// Google OAuth2.0
const googleLogin = passport.authenticate("google");

const jwtCookie = async (req, res) => {
  const { id, firstName, lastName } = req.user;
  const payload = {
    id,
    firstName,
    lastName,
  };
  try {
    const token = await jwt.sign(payload, process.env.SECRET);
    res
      .cookie("jwt", token, { httpOnly: true, sameSite: true })
      .cookie("payload", token.split(".")[1]);
  } catch (err) {
    if (err) return res.sendStatus(400);
  }
  return res.status(200).json({
    authenticated: true,
  });
};

module.exports = {
  facebookLogin,
  facebookCallback,
  googleLogin,
  jwtCookie,
};
