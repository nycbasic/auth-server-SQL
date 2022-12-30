const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.TEST_EMAIL_SERVICE,
  port: process.env.TEST_EMAIL_PORT,
  auth: {
    user: process.env.TEST_EMAIL_USER,
    pass: process.env.TEST_EMAIL_PW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const resetPasswordEmail = (user, token) => {
  const email = {
    from: "'Password Reset'<password-reset@domain.com>",
    to: user,
    subject: "Your Password Reset Confirmation",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please <a href="https://localhost:3001/api/users/v1/forgot/${token}">click here</a>, or paste this into your browser to complete the process:\n\n https://localhost:3001/api/users/v1/forgot/${token}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  return email;
};

module.exports = {
  transporter,
  resetPasswordEmail,
};
