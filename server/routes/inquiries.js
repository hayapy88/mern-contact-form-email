const express = require("express");
const Inquiry = require("../models/Inquiry");
const router = express.Router();

// Post /inquiry
router.post("/", (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = Inquiry.create({ name, email, message });
    res.status(201).json({
      status: "success",
      message: "Your inquiry was created successfully",
      inquiry: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to create inquiry",
      error: error.massage,
    });
  }

  console.log(req.body);
  res.send("Inquiry created");
});

module.exports = router;
