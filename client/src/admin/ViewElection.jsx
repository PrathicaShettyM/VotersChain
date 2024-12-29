import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function ViewElection(){
  const [election, setElection] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axiosInstance.get('/admin/view-elections');
        setElection(response.data);
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
              <th className="px-4 py-2">Name of Election</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Start Timings</th>
              <th className="px-4 py-2">Duration (in minutes)</th>
            </tr>
          </thead>
          <tbody>
            {election.map((election) => (
              <tr key={election.name} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{election.name}</td>
                <td className="border px-4 py-2">{election.description}</td>
                <td className="border px-4 py-2">{election.start_time}</td>
                <td className="border px-4 py-2">{election.duration_minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewElection;