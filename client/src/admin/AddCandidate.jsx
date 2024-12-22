import { useState } from 'react';
import axiosInstance from '../axiosInstance';

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    ethereumAddress: '',
    name: '',
    partyAffiliation: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/admin/add-candidate', formData);
      alert(`Success: ${response.data.message}`);
      setFormData({
        ethereumAddress: '',
        name: '',
        partyAffiliation: '',
        bio: '',
      });
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'An unexpected error occurred'}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg space-y-4 max-w-md w-full border-2 border-black"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-950">Register Candidate</h2>
        <div>
          <label htmlFor="ethereumAddress" className="block text-sm font-medium text-gray-700">
            Ethereum Address
          </label>
          <input
            type="text"
            name="ethereumAddress"
            id="ethereumAddress"
            value={formData.ethereumAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Ethereum address"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter candidate's name"
            required
          />
        </div>
        <div>
          <label htmlFor="partyAffiliation" className="block text-sm font-medium text-gray-700">
            Party Affiliation (optional)
          </label>
          <input
            type="text"
            name="partyAffiliation"
            id="partyAffiliation"
            value={formData.partyAffiliation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter party affiliation (optional)"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio (optional)
          </label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter candidate's bio (optional)"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default AddCandidate;