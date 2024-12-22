import { useState } from 'react';
import axiosInstance from '../axiosInstance';

const AddVoter = () => {
  const [formData, setFormData] = useState({
    ethereumAddress: '',
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/admin/register-voter', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Error registering voter: ' + error.response?.data?.message);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="min-h-screen flex items-center justify-center bg-gray-100"
>
  <div className="p-6 bg-white shadow-lg rounded-lg space-y-4 max-w-md w-full border-2 border-black">
    <h1 className='font-bold text-center text-3xl text-cyan-950'>Register Voter</h1>
    <div>
      <label htmlFor="ethereumAddress" className="block font-medium text-gray-700">
        Ethereum Address
      </label>
      <input
        type="text"
        name="ethereumAddress"
        id="ethereumAddress"
        value={formData.ethereumAddress}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      <label htmlFor="name" className="block font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      <label htmlFor="email" className="block font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      <label htmlFor="phoneNumber" className="block font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="dateOfBirth" className="block font-medium text-gray-700">
        Date of Birth
      </label>
      <input
        type="date"
        name="dateOfBirth"
        id="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      <label htmlFor="password" className="block font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
    >
      Register Voter
    </button>
  </div>
</form>

  );
};

export default AddVoter;
