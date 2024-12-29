import { useState } from 'react';
import axiosInstance from '../axiosInstance';

function AddCandidate(){
  const [formData, setFormData] = useState({
    ethereumAddress: '',
    name: '',
    party_affiliation: '',
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ethereumAddress) {
      alert('Ethereum Address is required.');
      return;
  }
    try {
      const response = await axiosInstance.post('/admin/register-candidate', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Error registering candidate: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded shadow-md border-black border-2">
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-950">Add Candidate</h2>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor='ethereumAddress'>Ethereum Address</label>
          <input
            type="text"
            name="ethereumAddress"
            id="ethereumAddress"
            value={formData.ethereumAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Party Affiliation</label>
          <input
            type="text"
            name="party_affiliation"
            value={formData.party_affiliation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default AddCandidate;
