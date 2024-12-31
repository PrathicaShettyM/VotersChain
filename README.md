# 🌐 VotersChain

VotersChain is a robust, decentralized voting system designed to ensure secure, transparent, and tamper-proof elections. Built with a full-stack architecture, it incorporates blockchain technology to guarantee the integrity of the voting process while providing an intuitive and user-friendly experience for both voters and administrators.

---

## ✨ Features

### 1. 🔐 **Login for Voters and Admin**
   - Unified login interfaces for voters and administrators.

### 2. 🔒 **Role-Based Authentication**
   - Role-based access control to ensure only authorized actions are performed.
   - Admins manage the election setup and voter/candidate registration.
   - Voters can participate in elections once registered.

### 3. ☑️ **Vote Only Once**
   - A robust mechanism that ensures each voter can cast their vote only once during an election.
   - Blockchain technology used to validate and record voting activity.

### 4. 📈 **Election Management**
   - Admins can register voters, candidates, and set up elections.
   - Elections, voters, and candidates can be viewed in a detailed and organized manner.
   - Voters are notified about their credentials via email for secure access.

### 5. 👥 **Admin Controls**
   - Admins have full control to:
     - Register voters and candidates.
     - Create and manage elections.
     - Monitor election progress and results.

### 6. ⚙️ **Blockchain Integration**
   - All registrations (voters, candidates, and elections) are recorded on the blockchain using **Hardhat**.
   - Ensures data integrity and prevents unauthorized alterations.

### 7. 📊 **Audit Trail and Vote Records**
   - Transparent storage of voting records on the blockchain.
   - Full audit trail of transactions to ensure accountability and traceability.

### 8. 📧 **Email Notification System**
   - Voter credentials are securely emailed using **Nodemailer**.
   - Notifications ensure secure communication of login details.

### 9. 🏆 **Results Page**
   - A dedicated results page displays the winner of each election.
   - Ensures transparency and quick access to election outcomes.

### 10. 🛠️ **Full-Stack Implementation**
   - Frontend: **React** and **Tailwind CSS** for a responsive and modern user interface.
   - Backend: **Express.js** and **Node.js** for robust API development.
   - Database: **MongoDB** for efficient data management.

---

## 🔧 Tech Stack

### 🎨 Frontend
- **React**: For building dynamic and responsive user interfaces.
- **Tailwind CSS**: For styling and ensuring a clean, professional design.

### 🚀 Backend
- **Express.js**: For API development and server-side logic.
- **Node.js**: For handling backend processes efficiently.
- **Nodemailer**: For secure email communication of voter credentials.

### 📃 Database
- **MongoDB**: For storing user data, election details, and results securely.

### 🛠️ Blockchain
- **Hardhat**: For blockchain interaction, smart contract deployment, and testing.

---

## ⚡️ Installation and Setup

### Prerequisites
- **Node.js** (v22)
- **MongoDB**
- **Hardhat**
- **npm** 

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/PrathicaShettyM/VotersChain.git
   ```
2. Navigate to the project directory:
   ```bash
   cd VotersChain
   ```
3. Install dependencies for both the frontend and backend:
   ```bash
   cd client
   npm install

   cd smartcontract
   npm install
   
   cd ../../backend
   npm install
   ```
4. Configure environment variables for the backend:
   - Create a `.env` file in the `backend` directory with the following keys:
     ```env
     JWT_SECRET=<your_jwt_secret>
     EMAIL_USER=<your_email_address>
     EMAIL_PASS=<your_email_password> use google app protection's password
     ```
5. Start the MongoDB server.
6. Deploy smart contracts using Hardhat:
   ```bash
   cd smartcontract
   npx hardhat deploy
   ```
7. Start the backend server:
   ```bash
   cd server
   nodemon server.js
   ```
8. Start the frontend server:
   ```bash
   cd client
   npm run dev
   ```
   
---
