const nodemailer = require("nodemailer");

const sendMail = (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error while sending mail (mailSender) - ", email);
  }
};

module.exports = sendMail;
