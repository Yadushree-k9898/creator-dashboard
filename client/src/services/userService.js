// import axios from 'axios';

// const API = '/api/users';

// const getDashboard = async () => {
//   const res = await axios.get(`${API}/dashboard`);
//   return res.data;
// };

// const userService = {
//   getDashboard,
// };

// export default userService;



import axios from 'axios';
  
  const API = 'http://localhost:5000/api/users';
  
  // Create axios instance with custom config
  const axiosInstance = axios.create({
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add request interceptor to include auth token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  const getDashboard = async () => {
    try {
      const res = await axiosInstance.get('/dashboard');
      // Validate and transform the data
      const data = res.data;
      if (!data) {
        throw new Error('No data received from server');
      }
  
      // Ensure creditStats exists and has the correct structure
      const creditStats = {
        totalCredits: data.creditStats?.totalCredits || 0,
        loginCredits: data.creditStats?.loginCredits || 0,
        profileCredits: data.creditStats?.profileCredits || 0,
        interactionCredits: data.creditStats?.interactionCredits || 0,
      };
  
      return {
        ...data,
        creditStats,
      };
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      throw error;
    }
  };
  
  const userService = {
    getDashboard,
  };
  
  export default userService;