const mongoose = require('mongoose');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Voter = mongoose.model('Voter');
require('dotenv').config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // You can use other services like Outlook, Yahoo, etc.
    port: 465,
    secure:true,
    auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
  logger: true, // Log SMTP connection info
  debug: true,  // Enable debug mode
});

// Route to send email
router.post('/admin/send-email-to-all', async (req, res) => {
  try {
    // Fetch voter details
    const voters = await Voter.find({});
    if (voters.length === 0) {
        return res.status(404).json({ message: 'No voters found in the database.' });
    }

    // Email content
    const emailPromises = voters.map((voter) => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: voter.email,
          subject: 'Your Voting Credentials',
          text: `Dear ${voter.name},
  
                    Congratulations on successfully registering as a voter in our election system! Below are your credentials and unique Ethereum address that you will use for the voting process:
  
                    Ethereum Address: ${voter.ethereumAddress}
                    Password: ${voter.password}
  
                    Please note:
                    1. This information is confidential and should not be shared with anyone.
                    2. Keep your Ethereum address secure, as it will be used to cast your vote.
                    3. If you encounter any issues during the voting process, feel free to contact our support team.
  
                    The voting system ensures transparency and security by leveraging blockchain technology. With your credentials, you will be able to access the voting portal and participate in shaping the future.
  
                    Thank you for being an active participant in our democratic process. Your vote matters!
  
                    Best regards,  
                    Election Commission`,
        };
  
        return transporter.sendMail(mailOptions);
      });

    // Send email
    await Promise.all(emailPromises);
    res.status(200).json({ message: 'Emails sent successfully to all voters.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails.', error });
  }
});

module.exports = router;
