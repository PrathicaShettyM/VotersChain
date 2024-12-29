import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function ViewCandidates(){
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axiosInstance.get('/admin/view-candidates');
        setCandidates(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching voters');
      }
    };
    fetchCandidates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-cyan-950 mb-4">Candidate List</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="bg-white shadow-lg rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2">Ethereum Address</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Party Affiliation</th>
              <th className="px-4 py-2">Bio</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.ethereumAddress} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{candidate.ethereumAddress}</td>
                <td className="border px-4 py-2">{candidate.name}</td>
                <td className="border px-4 py-2">{candidate.part_affiliation}</td>
                <td className="border px-4 py-2">{candidate.bio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewCandidates;