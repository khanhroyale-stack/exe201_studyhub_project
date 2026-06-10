import axios from 'axios';
import { UnifiedPost, UnifiedApplication, UnifiedClass, ParentFeedback } from '../types/shared';

const BASE_URL = 'http://localhost:8080/api/v1/parent-portal';

export interface DashboardStats {
  activeApplications: number;
  newApplicationsToday: number;
  classesWaiting: number;
  budgetSpentThisMonth: number;
}

export const parentPortalApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await axios.get(`${BASE_URL}/dashboard`);
    return response.data;
  },

  getJobPostings: async (): Promise<UnifiedPost[]> => {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  },

  createJobPosting: async (data: Partial<UnifiedPost>): Promise<UnifiedPost> => {
    const response = await axios.post(`${BASE_URL}/posts`, data);
    return response.data;
  },

  getApplicantsByJob: async (jobId: string | number): Promise<UnifiedApplication[]> => {
    const response = await axios.get(`${BASE_URL}/posts/${jobId}/applicants`);
    return response.data;
  },

  acceptApplication: async (applicationId: string | number): Promise<void> => {
    await axios.post(`${BASE_URL}/applicants/${applicationId}/accept`);
  },

  getClasses: async (): Promise<UnifiedClass[]> => {
    const response = await axios.get(`${BASE_URL}/classes`);
    return response.data;
  },

  getFeedbacks: async (): Promise<ParentFeedback[]> => {
    const response = await axios.get(`${BASE_URL}/feedback`);
    return response.data;
  },

  createFeedback: async (data: Partial<ParentFeedback>): Promise<void> => {
    await axios.post(`${BASE_URL}/feedback`, data);
  }
};
