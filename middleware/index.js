const jwt = require("jsonwebtoken");
const Users = require("");

const auth = async (req, res, next) => {
  console.log("FROM AUTH MIDDLEWARE: ", req.cookies);
  console.log("FROM AUTH MIDDLEWARE: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.log(err);
    }
  }
  return res.status(400).json({
    message: "User not authorized!",
  });
};

module.exports = auth;
