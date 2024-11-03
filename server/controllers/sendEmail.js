const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailToCustomer = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: subject,
    html: html,
  };
  const mailToAdmin = {
    from: process.env.GMAIL_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailToCustomer);
    console.log("Email sent to Customer successfully");
    await transporter.sendMail(mailToAdmin);
    console.log("Email sent to Admin successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email" });
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
