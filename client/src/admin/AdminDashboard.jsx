import {Link} from 'react-router-dom';
import axiosInstance from '../axiosInstance';

function AdminDashboard() {
  const voters = [
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", 
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  ];

  const candidates = [
    { address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", name: "Modi", party: "BJP" },
    { address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", name: "Rahul Gandhi", party: "Congress" },
    { address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", name: "Kejriwal", party: "AAP" },
  ];

  const registerVoter = async (voterAddress) => {
    try {
      const response = await axiosInstance.post("/admin/register-voter-on-blockchain", { voterAddress });
      return { success: true, voterAddress: response.data.voterAddress };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  const handleRegisterVoters = async () => {
    for (const voter of voters) {
      const result = await registerVoter(voter);
      if (result.success) {
        console.log(`Voter registered: ${result.voterAddress}`);
      } else {
        console.error(`Error: ${result.error}`);
      }
    }
    alert("All voters registered on blockchain!");
  };


  const handleRegisterCandidates = async () => {
    try {
      const electionId = "12345"; 
      const response = await axiosInstance.post("/admin/register-candidate-on-blockchain", {
        electionId,
        candidates, // Sending entire candidates array
      });
  
      if (response.data.success) {
        console.log("Candidates saved to the database successfully.");
        alert("Candidates saved to the database!");
      } else {
        console.error("Failed to save candidates to the database:", response.data.error);
        alert("Failed to save candidates. Check logs for details.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error saving candidates to the database. Check logs.");
    }
  };

  const handleSendEmail = async () => {
    try {
      const confirmSend = window.confirm('Are you sure you want to send voting credentials to all voters?');
      if (!confirmSend) {
        return;
      }
  
      const response = await axiosInstance.post('/admin/send-email-to-all');
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred while sending the emails.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Election Commissioners Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-md px-4 py-6">
          <nav>
            <ul className="space-y-4">
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-voter">Add Voters</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-candidate">Add Candidates</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-election">Set Election Details</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-candidate-on-blockchain" onClick={handleRegisterCandidates}>Register Candidates on Blockchain</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-voter-on-blockchain" onClick={handleRegisterVoters}>Register Voters on Blockchain</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link onClick={handleSendEmail}>Send Voter Credentials</Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Voters Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Voters</h2>
              <p className="text-gray-600">View voter details.</p>
              <Link to="/admin/view-voters" className="text-blue-500 hover:underline">View Voters</Link>
            </div>

            {/* Candidates Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Candidates</h2>
              <p className="text-gray-600">View candidate profiles.</p>
              <Link to="/admin/view-candidates" className="text-blue-500 hover:underline">View Candidates</Link>
            </div>

            {/* Election Details Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Election Details</h2>
              <p className="text-gray-600">Set the date, start, and end time for elections.</p>
              <Link to="/admin/view-elections" className="text-blue-500 hover:underline">View Election Details</Link>
            </div>

            {/* Results Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Results</h2>
              <p className="text-gray-600">View election results and insights.</p>
              <Link to="/admin/results/12345" className="text-blue-500 hover:underline">View Results</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
