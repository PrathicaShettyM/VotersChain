const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

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

// Seed Admin
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

// 1. Register Admin Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({
      message: 'Login successful',
      redirectTo: '/admin/dashboard',
    });
  } catch (error) {
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


// Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
