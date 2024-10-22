const Inquiry = require("../models/Inquiry");
const sendEmail = require("./sendEmail");

const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = await Inquiry.create({ name, email, message });

    const subject = "Thank you for your inquiry test submission";
    const html = `<p style="color: black !important;">Hi ${name},<br><br>Thank you for testing the inquiry form.<br>I have received your inquiry as follows:<br>-----<br>${message}<br><br>Kind regards,<br>Hayato</p>`;
    sendEmail(email, subject, html);

    res.status(201).json({
      status: "success",
      message: "Your inquiry was created successfully",
      inquiry: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to create inquiry",
      error: error.message,
    });
  }
};

module.exports = { createInquiry };
