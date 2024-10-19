const express = require("express");
const router = express.Router();

// Post /inquiry
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Inquiry created");
});

module.exports = router;
