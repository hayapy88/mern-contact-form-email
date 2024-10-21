const express = require("express");
const { createInquiry } = require("../controllers/inquiries");
const router = express.Router();

// Post /inquiry
router.post("/", createInquiry);

module.exports = router;
