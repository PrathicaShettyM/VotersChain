import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const VotingPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [ethereumAddress, setEthereumAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    // Fetch candidates
    const fetchCandidates = async () => {
      try {
        const candidatesResponse = await axiosInstance.get('/voter/vote');
        setCandidates(candidatesResponse.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    try {
      const response = await axiosInstance.post('/voter/vote', {
        candidateId: selectedCandidate,
        ethereumAddress,
        privateKey,
      });

      setVoted(true);
      setMessage(response.data.message); // success message
      setShowModal(false);

      // Update the vote count in the frontend
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === selectedCandidate
            ? { ...candidate, votes: (candidate.votes || 0) + 1 }
            : candidate
        )
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error submitting vote. Please try again.';
      setMessage(errorMessage);
      setShowModal(false);
    }
  };

  const openModal = (candidateId) => {
    setSelectedCandidate(candidateId);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Voting Node</h1>

      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Candidate Name</th>
            <th className="px-4 py-2">Party Name</th>
            <th className="px-4 py-2">Votes Count</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id} className="border-b">
              <td className="px-4 py-2 text-center">{candidate.name}</td>
              <td className="px-4 py-2 text-center">{candidate.party}</td>
              <td className="px-4 py-2 text-center">{candidate.votes || 0}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className={`px-4 py-2 text-white font-bold rounded ${
                    voted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                  }`}
                  onClick={() => openModal(candidate._id)}
                  disabled={voted}
                >
                  Vote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {message && <p className="mt-4 text-center text-red-600 font-bold">{message}</p>}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter Details</h2>
            <input
              type="text"
              placeholder="Ethereum Address"
              value={ethereumAddress}
              onChange={(e) => setEthereumAddress(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <input
              type="password"
              placeholder="Private Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;
