import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';

const ResultsPage = () => {
  const { electionId } = useParams(); // Get electionId from URL parameters
  const [candidates, setCandidates] = useState([]);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get(`/results/${electionId}`);
        setCandidates(response.data.candidates);
        setWinner(response.data.winner);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to fetch results. Please try again later.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [electionId]);

  if (loading) {
    return <p className="text-center text-blue-500">Loading results...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Election Results</h1>
      {winner && (
        <div className="bg-green-100 p-4 rounded-md shadow-md text-center mb-6">
          <h2 className="text-xl font-bold text-green-800">Winner</h2>
          <p className="text-lg">
            {winner.candidateName} with {winner.voteCount} votes
          </p>
        </div>
      )}
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Candidate Name</th>
            <th className="px-4 py-2">Vote Count</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.candidateId} className="border-b">
              <td className="px-4 py-2 text-center">{candidate.candidateName}</td>
              <td className="px-4 py-2 text-center">{candidate.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;
