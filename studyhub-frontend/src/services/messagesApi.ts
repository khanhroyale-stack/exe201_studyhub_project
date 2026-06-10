import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/messages';

export const messagesApi = {
  getMessages: async (appId: number) => {
    const response = await axios.get(`${BASE_URL}/application/${appId}`);
    return response.data;
  },

  sendMessage: async (appId: number, senderId: number, content: string) => {
    const response = await axios.post(`${BASE_URL}`, {
      applicationId: appId,
      senderId,
      content
    });
    return response.data;
  }
};
