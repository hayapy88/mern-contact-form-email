const nodemailer = require("nodemailer");

// Send email using Gmail
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Email options
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

  // Send email to customer and admin
  try {
    await transporter.sendMail(mailToCustomer);
    console.log("Email sent to Customer successfully");
    await transporter.sendMail(mailToAdmin);
    console.log("Email sent to Admin successfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send email" };
  }
};

module.exports = sendEmail;
