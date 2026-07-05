const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone_number: { type: String, required: true, unique: true, maxlength: 10 },
  role: {
    type: String,
    enum: ['super_admin', 'clinic_admin', 'doctor', 'receptionist'],
    default: 'clinic_admin',
  },
  otp: { type: String },
  otp_expiry: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);