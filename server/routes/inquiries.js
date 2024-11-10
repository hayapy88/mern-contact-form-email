const express = require("express");
const { body, validationResult } = require("express-validator");
const { createInquiry } = require("../controllers/inquiryController");
const router = express.Router();

// Validation middleware
const validateInquiry = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

// POST /inquiries
// 1. Validate the request body
// 2. Create a new inquiry
router.post(
  "/",
  validateInquiry,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        status: "failed",
        errors: errors.array(),
      });
    }
    console.log("Validation passed");
    next();
  },
  createInquiry
);

module.exports = router;
