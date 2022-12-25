const jwt = require("jsonwebtoken");

const jwtCookie = async (user, req, res, next) => {
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
};

module.exports = {jwtCookie};
