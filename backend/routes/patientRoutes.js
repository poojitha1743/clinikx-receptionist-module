const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Check if patient exists by phone number
router.post("/check", async (req, res) => {
  try {
    const { phone } = req.body;

    const patient = await Patient.findOne({ phone });

    if (patient) {
      return res.json({
        exists: true,
        patient,
      });
    }

    return res.json({
      exists: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Register a new patient
router.post("/register", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      message: "Patient registered successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;