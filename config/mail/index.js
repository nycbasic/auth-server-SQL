const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
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
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'https://localhost:3001/api/users/v1/forgot/${token}\n\n'
        'If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  return email;
};

module.exports = {
  transporter,
  resetPasswordEmail,
};
