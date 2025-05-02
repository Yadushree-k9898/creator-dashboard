import axios from 'axios';

const API = 'http://localhost:5000/api/admin';

const getDashboard = async () => {
  const res = await axios.get(`${API}/dashboard`);
  return res.data;
};

// You can add more admin API calls here as needed

const adminService = {
  getDashboard,
};

export default adminService;