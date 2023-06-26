const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, verificationToken) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });

  const accessToken = auth.getAccessToken();

  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Blog Email Verification",
    html: `<div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Blogger. To complete your registration, please confirm your account.</span></div><a href="http://localhost:3000/verify-account/${verificationToken}">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Bloggers allow you to create your Blogs and read Others Blog.Plese Conform Your Email address so we can verify you.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

exports.passwordResetEmail = (email, name, token) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });

  const accessToken = auth.getAccessToken();

  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Blogger Password Reset",
    html: `<div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You Forget Blogger's password. To reset your password, Click Below.</span></div><a href="http://localhost:3000/reset-password/${token}">Reset your password</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Bloggers allow you to create your Blogs and read Others Blog.Plese Conform Your Email address so we can verify you.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

exports.sendMessageEmail = (email, subject, text) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });

  const accessToken = auth.getAccessToken();

  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: `${subject}`,
    html: `<div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello Blogger</span><div style="padding:20px 0"><span style="padding:1.5rem 0"></span></div>${text}<br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Bloggers allow you to create your Blogs and read Others Blog.Plese Conform Your Email address so we can verify you.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
