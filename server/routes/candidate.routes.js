const express = require('express');
const Candidate = require('../models/candidate.js');
const router = express.Router();

// 1. Create a Candidate
router.post('/admin/register-candidate', async (req, res) => {
  const { ethereumAddress, name, party_affiliation, bio } = req.body;

  try {
    const newCandidate = new Candidate({
      ethereumAddress,
      name,
      party_affiliation,
      bio,
    });

    await newCandidate.save();
    res.status(201).json({ message: 'Candidate registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering candidate', error });
    console.log(error);
  }
});


// 2. View all Candidates
router.get('/admin/view-candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error });
  }
});

module.exports = router;