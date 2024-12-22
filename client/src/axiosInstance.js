// connect frontend and backend: in frontend
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
