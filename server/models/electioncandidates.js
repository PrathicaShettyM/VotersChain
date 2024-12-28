const mongoose = require("mongoose");

const electionCandidateSchema = new mongoose.Schema({
  electionId: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  party: { type: String, required: true },
});

module.exports = mongoose.model("electionCandidate", electionCandidateSchema, "electioncandidates");

