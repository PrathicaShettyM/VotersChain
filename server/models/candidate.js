const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  ethereumAddress: { type: String, required: false, unique: true },
  name: { type: String, required: true },
  party_affiliation: { type: String },
  bio: { type: String },
  created_at: { type: Date, default: Date.now },
});


const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;