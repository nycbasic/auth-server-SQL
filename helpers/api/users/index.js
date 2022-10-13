const userLogin = (req, res) => {
  return res.status(200).json({
    message: "login endpoint logic success",
    data: req.body,
  });
};

const userSignUp = (req, res) => {
  return res.status(200).json({
    message: "sign-up endpoint success",
    data: req.body,
  });
};

const checkUser = (req, res) => {}

const forgotPassword = (req, res) => {
  return res.status(200).json({
    message: "forgot password endpoint success",
    data: req.body,
  });
};

const userDelete = (req, res) => {
    return res.status(200).json({
        message: "delete user endpoint success"
    })
}

module.exports = {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete
};
