const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");

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
    bcrypt.compare(password, dataValues.password, async (err, success) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (success) {
        const { id, firstName, lastName } = user;
        const payload = {
          id,
          firstName,
          lastName,
        };
        const token = await jwt.sign(payload, process.env.SECRET).split(".");

        return res
          .cookie(
            "jwtheader",
            { header: token[0], signature: token[2] },
            { httpOnly: true, sameSite: true }
          )
          .cookie("payload", token[1])
          .status(201)
          .json({
            message: "Successfully logged in!",
            user,
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
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = await jwt.sign(payload, process.env.SECRET).split(".");

    return res
      .cookie(
        "jwtheader",
        { header: token[0], signature: token[2] },
        { httpOnly: true, sameSite: true }
      )
      .cookie("payload", token[1])
      .status(200)
      .json({
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong",
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


// Test Controller
const test = (req, res) => {
  
}

module.exports = {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete,
  checkUser,
};
