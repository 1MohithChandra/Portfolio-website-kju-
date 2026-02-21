const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const saved = await Contact.create(req.body);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
