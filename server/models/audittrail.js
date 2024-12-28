const mongoose = require('mongoose');

const AuditTrailsSchema = new mongoose.Schema({
    transactionHash: { type: String, required: true },
    transactionType: { type: String, required: true },
    userEthereumAddress: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    additionalDetails: { type: mongoose.Schema.Types.Mixed },
  }, { timestamps: true });

const AuditTrail = mongoose.model("AuditTrail", AuditTrailsSchema);
module.exports = AuditTrail;
  