const nodemailer = require("nodemailer");

const activationEmail = (url) => {
  return `
  <div style="max-width: 700px; margin: auto; border: 10px solid #999; padding: 20px; font-size: 110%; text-align: center">
  <img style="display: block; width: 200px; height: 200px; margin: 0 auto;" src="https://res.cloudinary.com/phongvn2611/image/upload/v1634738823/english/avatar/website-logo-small_uqfxjx.png" />
  <h2 style="text-transform: uppercase; color: #68c2e8;">Activate your email</h2>
  <p>Congratulations! You're almost set to start using English Website.
      Just click the button below to validate your email address.
  </p>
  
  <a href=${url} style="background: #68c2e8; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your email address</a>

  <p>If the button doesn't work for any reason, you can also click on the link below:</p>

  <div>${url}</div>
  </div>
`;
};

const resetPasswordMail = (url) => {
  return `
  <div style="max-width: 700px; margin: auto; border: 10px solid #999; padding: 20px; font-size: 110%; text-align: center">
  <img style="display: block; width: 200px; height: 200px; margin: 0 auto;" src="https://res.cloudinary.com/phongvn2611/image/upload/v1634738823/english/avatar/website-logo-small_uqfxjx.png" />
  <h2 style="text-transform: uppercase; color: #68c2e8;">Reset your password</h2>
  <p>Forget your password? Don't worry.
      Just click the button below to reset your password.
  </p>
  
  <a href=${url} style="background: #68c2e8; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset your password</a>

  <p>If the button doesn't work for any reason, you can also click on the link below:</p>

  <div>${url}</div>
  </div>
`;
};

const sendEmail = (to, content) => {
  const smtpTransport = nodemailer.createTransport({
    service: "smtp.ethereal.mail",
    port:587,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: to,
    subject: "English Website",
    html: content,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = {
  sendEmail,
  activationEmail,
  resetPasswordMail,
};
