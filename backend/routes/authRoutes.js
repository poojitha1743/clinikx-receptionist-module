const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  const { phone_number } = req.body;

  if (!phone_number || phone_number.length !== 10) {
    return res.status(400).json({ success: false, message: 'Valid 10-digit phone number required' });
  }

  try {
    const user = await User.findOne({ phone_number });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Phone number not registered' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otp_expiry = new Date(Date.now() + 5 * 60 * 1000); // valid 5 minutes
    await user.save();

    console.log(`OTP for ${phone_number}: ${otp}`); // replace with SMS gateway in production

    res.json({ success: true, message: 'OTP sent successfully', otp }); // remove "otp" in production
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { phone_number, otp } = req.body;

  try {
    const user = await User.findOne({
      phone_number,
      otp,
      otp_expiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otp_expiry = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, phone_number: user.phone_number, role: user.role },
      process.env.JWT_SECRET || 'clinikx_secret_2024',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, phone_number: user.phone_number, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;