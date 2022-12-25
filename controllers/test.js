const success = (req, res, next) => {
   console.log("FROM TEST PERSIST DUMMY ROUTE - user", req.user);
  return res.json({
    message: req.user,
  });
};

module.exports = {
  success,
};
