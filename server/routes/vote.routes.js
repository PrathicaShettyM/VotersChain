const express = require('express');
const crypto = require('crypto');
const Voter = require('../models/voter');
const Candidate = require('../models/electioncandidates');
const AuditTrail = require('../models/audittrail');
const Votes = require('../models/votes');

const router = express.Router();

// Vote Route
router.post('/voter/vote', async (req, res) => {
    const { candidateId, ethereumAddress, privateKey } = req.body;

    try {
        // Check if voter exists with the provided Ethereum address and private key
        const voter = await Voter.findOne({ ethereumAddress, password: privateKey });
        if (!voter) {
            return res.status(400).json({ message: 'Invalid Ethereum address or private key' });
        }

        // Check if the candidate exists
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Check if the voter has already voted for this election
        const alreadyVoted = await Votes.findOne({
            electionId: candidate.electionId,
            voterEthereumAddress: ethereumAddress,
        });
        if (alreadyVoted) {
            return res.status(400).json({ message: 'You have already voted in this election and cannot vote again.' });
        }

        // Generate a random transaction hash
        const transactionHash = crypto.randomBytes(16).toString('hex');

        // Save vote to the Votes collection
        await Votes.create({
            electionId: candidate.electionId,
            candidateId: candidateId,
            voterEthereumAddress: ethereumAddress,
        });

        // Increment the vote count for the candidate
        candidate.voteCount = (candidate.voteCount || 0) + 1; // Initialize if undefined
        await candidate.save();

        // Save audit trail
        await AuditTrail.create({
            transactionHash,
            transactionType: 'Vote',
            userEthereumAddress: ethereumAddress,
            additionalDetails: { candidateId },
        });

        res.status(200).json({
            message: 'Vote successfully submitted',
            transactionHash,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error('Error submitting vote:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Candidate Vote Counts Route
router.get('/results/:electionId', async (req, res) => {
    const { electionId } = req.params;

    try {
        // Find all candidates for the specified election
        const candidates = await Candidate.find({ electionId });

        // Map candidate data to include vote counts
        const candidateVoteCounts = candidates.map((candidate) => ({
            candidateId: candidate._id,
            candidateName: candidate.name,
            voteCount: candidate.voteCount || 0,
        }));

        // Determine the candidate with the highest votes
        const winner = candidateVoteCounts.reduce((prev, curr) =>
          curr.voteCount > prev.voteCount ? curr : prev,
        );

        res.status(200).json({ 
          candidates: candidateVoteCounts, 
          winner: { 
              candidateName: winner.candidateName, 
              voteCount: winner.voteCount 
          } 
      });
    } catch (error) {
        console.error('Error fetching vote counts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
