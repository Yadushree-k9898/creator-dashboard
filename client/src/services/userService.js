import axios from 'axios';

const API = '/api/users';

const getDashboard = async () => {
  const res = await axios.get(`${API}/dashboard`);
  return res.data;
};

const userService = {
  getDashboard,
};

export default userService;