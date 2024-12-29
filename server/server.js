const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/adminLogin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Connection error:', err);
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Admin = mongoose.model('Admin', AdminSchema);

// Seed Admin directly
const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
      await Admin.create({ email: 'admin@gmail.com', password: 'admin12345' });
      console.log('Admin seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};
seedAdmin();

// Login route for both Admin and Voters
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user is an admin
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      return res.status(200).json({
        message: 'Login successful as admin',
        redirectTo: '/admin/dashboard',
      });
    }

    // Check if the user is a voter
    const Voter = require('./models/voter');
    const voter = await Voter.findOne({ email, password });
    if (voter) {
      const token = jwt.sign({ id: voter._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use a secure JWT secret
      console.log('Token:', token);
      return res.status(200).json({
        message: 'Login successful',
        token,
        redirectTo: '/voter/vote',
      });
    }

    // If neither admin nor voter
    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// 2. Register Voters
const voterRoutes = require('./routes/voter.routes');
app.use('/', voterRoutes);

// 3. Register Candidates
const candidateRoutes = require('./routes/candidate.routes'); 
app.use('/', candidateRoutes);

// 4. Register Elections
const electionRoutes = require('./routes/election.routes'); 
app.use('/', electionRoutes);

// 5. Register Election Candidates on Blockchain
const blockchainCandidatesRoutes = require('./routes/blockchaincandidates.routes');
app.use('/', blockchainCandidatesRoutes);

// 6. Voting page routes
const votingpage = require('./routes/votingpage.routes');
app.use('/', votingpage)

const votes = require('./routes/vote.routes')
app.use('/', votes)

const sendEmail = require('./routes/email.routes');
app.use('/', sendEmail);

// Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
