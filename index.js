require("dotenv").config();
const express = require("express");
const db = require("./config/sequelize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// Testing Facebook OAuth2.0
const session = require("express-session");
// END

const cors = require("cors");

const app = express();
const port = process.env.PORT;
const users = require("./routes/Users");
const test = require("./routes/Test");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Testing Facebook OAuth 2.0
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
  })
);

app.use(passport.authenticate("session"));
// END

app.use(passport.initialize());
require("./config/passport/jwtcookie")(passport);
require("./config/passport/google")(passport);
require("./config/passport/facebook")(passport);
app.use(cors());

// app.use((req, res, next) => {
//   console.log(req.session);
// });

app.use("/api/users/v1", users);
app.use(test);

db.authenticate()
  .then(() => console.log("connected to PostGRES-SQL"))
  .then(() => {
    // db.sync({alter: true})
    db.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log("server connected to: " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
