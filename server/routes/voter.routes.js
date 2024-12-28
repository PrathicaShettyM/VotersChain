const express = require('express');
const Voter = require('../models/voter.js');
const router = express.Router();

// 1. Register Voter
router.post('/admin/register-voter', async (req, res) => {
  const { ethereumAddress, name, email, phoneNumber, dateOfBirth, password } = req.body;

  try {
    const newVoter = new Voter({
      ethereumAddress,
      name,
      email,
      phoneNumber,
      dateOfBirth,
      password,
    });

    await newVoter.save();
    res.status(201).json({ message: 'Voter registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering voter', error });
    console.log(error);
  }
});

// 2. View Registered Voters
router.get('/admin/view-voters', async (req, res) => {
  try {
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching voters', error });
  }
});


module.exports = router;
