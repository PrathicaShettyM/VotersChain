const express = require('express');
const ElectionCandidates = require('../models/electioncandidates.js');
const router = express.Router();

// 1. display list of election candidates
router.get('/voter/vote', async (req, res) => {
    try {
      const candidates = await ElectionCandidates.find();
      res.status(200).json(candidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
  