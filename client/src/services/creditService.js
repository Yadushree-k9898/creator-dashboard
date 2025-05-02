import axios from 'axios';

const API_URL = '/api/credits'; // adjust this to match your backend URL

export const creditService = {
  getUserCredits: async () => {
    const response = await axios.get(`${API_URL}/user`);
    return response;
  }
};
