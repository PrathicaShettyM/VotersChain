const mongoose = require('mongoose');

const VotesSchema = new mongoose.Schema({
    electionId: { type: String, ref: "Election", required: true },
    candidateId: { type: String, ref: "Candidate", required: true },
    voterEthereumAddress: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }, { timestamps: true });
  
    VotesSchema.index({ electionId: 1, voterEthereumAddress: 1 }, { unique: true });
  
  
const Votes  = mongoose.model("Vote", VotesSchema);
module.exports = Votes;
  