const auth = (req, res, next) => {
  if (req.user && req.session.passport) {
    return next();
  }
  return res.status(400).json({
    message: "User not authorized!",
  });
};

module.exports = auth;
