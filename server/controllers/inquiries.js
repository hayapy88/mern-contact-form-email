const Inquiry = require("../models/Inquiry");

const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = await Inquiry.create({ name, email, message });
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
