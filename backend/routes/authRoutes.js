const express = require('express');
const router = express.Router();

router.post('/send-otp', (req, res) => {
  res.json({ success: true, message: 'OTP sent', otp: '1234' });
});

router.post('/verify-otp', (req, res) => {
  const { phone_number } = req.body;
  res.json({
    success: true,
    token: 'test-token-123',
    user: { id: 1, phone_number, role: 'clinic_admin' }
  });
});

module.exports = router;