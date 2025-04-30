import axios from '../lib/axiosInstance';

export const getUsersService = async () => {
  const response = await axios.get('/api/admin/users');
  return response;
};
