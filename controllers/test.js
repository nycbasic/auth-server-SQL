const success = (req, res, next) => {
  console.log("FROM SUCCESS DUMMY ROUTE - user", req.user);
  console.log("FROM SUCCESS DUMMY ROUTE - session", req.session);
  console.log("FROM SUCCESS DUMMY ROUTE - authenticated", req.isAuthenticated())
  return res.json({
    message: "Successfully logged in with OAuth!",
  });
};

const testPersist = (req, res, next) => {
  //console.log("FROM TEST PERSIST DUMMY ROUTE - user", req.user.fb);
  console.log("FROM TEST PERSIST DUMMY ROUTE - session", req.session);
  console.log("FROM TEST PERSIST DUMMY ROUTE - cookie", req.cookies);
  return res.json({
    message: "Testing persist",
  });
};

module.exports = {
  success,
  testPersist,
};
