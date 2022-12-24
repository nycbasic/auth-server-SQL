const passport = require("passport");
const jwt = require("jsonwebtoken");
// Facebook OAuth2.0
const facebook = (req, res, next) => {
  passport.authenticate("fb", { scope: ["email"] }, async (err, user) => {
    if (err) return res.sendStatus(400);
    const { id, firstName, lastName } = user;
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
  })(req, res, next);
};

// Google OAuth2.0
const google = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err) return res.sendStatus(400);
    const { id, firstName, lastName } = user;
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
  })(req, res, next);
};

module.exports = {
  google,
  facebook,
};
