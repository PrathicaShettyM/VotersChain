const express = require("express");
const router = express.Router();
const Candidate = require("../models/electioncandidates");

// Save candidates to the database
router.post("/admin/register-candidate-on-blockchain", async (req, res) => {
  const { electionId, candidates } = req.body;

  if (!electionId || !candidates || !Array.isArray(candidates)) {
    return res.status(400).json({ success: false, error: "Invalid data provided" });
  }

  try {
    const candidatesToSave = candidates.map((candidate) => ({
      electionId,
      address: candidate.address,
      name: candidate.name,
      party: candidate.party,
    }));

    await Candidate.insertMany(candidatesToSave);

    res.json({ success: true, message: "Candidates saved successfully" });
  } catch (error) {
    console.error("Error saving candidates:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
