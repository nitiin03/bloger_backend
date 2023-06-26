const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const { sendMessageEmail } = require("../../utils/mailer");
const EmailMsg = require("../../model/EmailMessaging/EmailMessaging");
const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const { to } = req.body;
  const email = to;
  //get the message
  const emailMessage = subject + " " + message;
  //prevent profanity/bad words
  const filter = new Filter();

  const isProfane = filter.isProfane(emailMessage);
  if (isProfane)
    throw new Error("Email sent failed, because it contains profane words.");

  try {
    sendMessageEmail(email, subject, message);
    await EmailMsg.create({
      sentBy: req?.user?._id,
      fromEmail: req?.user?.email,
      toEmail: to,
      message,
      subject,
    });
    res.json("[Sending Email...]");
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmailMsgCtrl };
