import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const ViewVoters = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axiosInstance.get('/admin/view-voters');
        setVoters(response.data);
      } catch (error) {
        alert('Error fetching voters');
        console.log(error);
      }
    };

    fetchVoters();
  }, []);

  return (
    <div>
      <h1>Registered Voters</h1>
      <ul>
        {voters.map((voter) => (
          <li key={voter._id}>
            {voter.name} - {voter.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewVoters;
