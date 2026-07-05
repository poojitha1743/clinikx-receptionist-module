const express = require('express');
const router = express.Router();
const Clinic = require('../models/Clinic');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/clinics/register
router.post('/register', verifyToken, async (req, res) => {
  const { name, phone_number, clinic_name, city, area } = req.body;

  if (!name || !phone_number || !clinic_name || !city || !area) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const clinic = await Clinic.create({
      user_id: req.user.id,
      contact_name: name,
      clinic_name,
      city,
      area,
      status: 'pending',
    });

    res.json({ success: true, message: 'Clinic registered successfully', clinic_id: clinic._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/clinics/:id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ success: false, message: 'Clinic not found' });
    res.json({ success: true, clinic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/clinics/:id
router.put('/:id', verifyToken, async (req, res) => {
  try {
    await Clinic.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: 'Clinic updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;