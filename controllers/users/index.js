const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");
const { fbAuth } = require("../../middleware");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "FROM USERLOGIN, NO EMAIL OR PASSWORD!",
    });
  }
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist!",
    });
  }

  try {
    const { dataValues } = user;
    // refactor to bring login data outside into a then block.
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
        const token = await jwt.sign(payload, process.env.SECRET);

        return res
          .cookie("jwt", token, { httpOnly: true, sameSite: true })
          .cookie("payload", token.split(".")[1])
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

    const token = await jwt.sign(payload, process.env.SECRET);

    return res
      .cookie("jwt", token, { httpOnly: true, sameSite: true })
      .cookie("payload", token.split(".")[1])
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
const test = async (req, res) => {
  console.log("FROM TEST CONTROLLER: ", req.user);
  console.log("FROM TEST CONTROLLER: ", req.session);
  return res.status(201).json({
    message: "SUCCESS!!!",
  });
};

module.exports = {
  userLogin,
  userSignUp,
  forgotPassword,
  userDelete,
  checkUser,
  test,
};
