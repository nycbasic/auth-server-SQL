const auth = async (req, res, next) => {
  const { jwt, payload } = req.cookies;
  if (req.isAuthenticated() && req.user) {
    return next();
  } else if (!(req.isAuthenticated() && req.user) && jwt && payload) {
    return next();
  }
  console.log("FAILED AT SESSION-AUTH!");
  return res.sendStatus(401);
};

module.exports = auth;
