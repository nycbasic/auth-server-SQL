const User = require("../../../models/Users");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist!",
    });
  }

  try {
    const { dataValues } = user;
    if (dataValues.password === password) {
      return res.status(201).json({
        message: "Successfully logged in!",
        token: "some jwt",
      });
    }
    return res.status(400).json({
      message: "Incorrect password!",
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const userSignUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(400).json({
      message: "User already exist!",
    });
  }

  try {
    const success = await User.create({ firstName, lastName, email, password });
    if (success) {
      return res.status(201).json({
        message: "User created!",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const checkUser = (req, res) => {
  return res.status(200).json({
    message: "Check if the user exist for forgot password end point success!",
  });
};

const forgotPassword = (req, res) => {
  return res.status(200).json({
    message: "forgot password endpoint success",
    data: req.body,
  });
};

const userDelete = (req, res) => {
  return res.status(200).json({
    message: "delete user endpoint success",
    data: req.body,
  });
};

module.exports = {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete,
  checkUser,
};
