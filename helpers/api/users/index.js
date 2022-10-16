const bcrypt = require("bcrypt");
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
    bcrypt.compare(password, dataValues.password, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (result) {
        return res.status(201).json({
          message: "Successfully logged in!",
          token: "some jwt",
        });
      }
      return res.status(400).json({
        message: "Incorrect password!",
      });
    });
    console.log("INSIDE BCRYPT METHOD");
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
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      User.create({
        firstName,
        lastName,
        email,
        password: hash,
      });
    });
    return res.status(201).json({
      message: "User created!",
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const checkUser = (req, res) => {
  console.log(req.body);
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
