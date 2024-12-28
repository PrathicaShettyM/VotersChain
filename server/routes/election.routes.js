const express = require('express');
const Election = require('../models/election.js');
const router = express.Router();

// 1. Create an Election
router.post('/admin/register-election', async (req, res) => {
  const { name, description, start_time, duration_minutes } = req.body;
  
  try {
    const newElection = new Election({
      name,
      description,
      start_time,
      duration_minutes,
    });
    
    await newElection.save();
    res.status(201).json({ message: 'Election created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message }, error);
    console.log(error);
  }
});

// 2. View All Elections
router.get('/admin/view-elections', async (req, res) => {
  try {
    const elections = await Election.find();
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;