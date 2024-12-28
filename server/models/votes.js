const mongoose = require('mongoose');

const VotesSchema = new mongoose.Schema({
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    voterEthereumAddress: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }, { timestamps: true });
  
    VotesSchema.index({ electionId: 1, voterEthereumAddress: 1 }, { unique: true });
  
  
const Votes  = mongoose.model("Vote", VotesSchema);
module.exports = Votes;
  