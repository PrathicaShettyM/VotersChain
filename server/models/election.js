const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true,},
  description: { type: String, trim: true,},
  start_time: { type: Date, required: true,},
  duration_minutes: { type: Number, required: true,},
  status: { type: String, enum: ['UPCOMING', 'ONGOING', 'COMPLETED'], default: 'UPCOMING',},
  created_at: { type: Date, default: Date.now,},
});

module.exports = mongoose.model('Election', electionSchema);
