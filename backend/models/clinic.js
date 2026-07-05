const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contact_name: { type: String, required: true },
  clinic_name: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'hold', 'approved', 'declined'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Clinic', clinicSchema);