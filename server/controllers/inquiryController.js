const Inquiry = require("../models/Inquiry");
const sendEmail = require("./sendEmail");

// Create a new inquiry
const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("Received data:", { name, email, message });

    const inquiry = await Inquiry.create({ name, email, message });
    console.log("Data saved to database:", inquiry);

    const subject = "Thank you for your inquiry test submission";
    const html = `<p style="color: black !important;">Hi ${name},<br><br>Thank you for testing the inquiry form.<br>I have received your inquiry as follows:<br>-----<br>${message}<br><br>Kind regards,<br>Hayato</p>`;
    const emailResult = await sendEmail(email, subject, html);

    if (emailResult.success) {
      res.status(201).json({
        status: "success",
        message: "Your inquiry was created successfully and email sent",
        inquiry: inquiry,
      });
    } else {
      res.status(500).json({
        status: "failed",
        message:
          "Your inquiry was created successfully but failed to send email",
        inquiry: inquiry,
      });
    }
  } catch (error) {
    console.error("Error saving to database or sending email:", error.message);
    res.status(500).json({
      status: "failed",
      message: "Failed to create inquiry or send email",
      error: error.message,
    });
  }
};

module.exports = { createInquiry };
