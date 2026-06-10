import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/admin-portal';

export const adminApi = {
  getDashboardStats: async () => {
    const response = await axios.get(`${BASE_URL}/dashboard`);
    return response.data;
  },

  getUsers: async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  }
};
