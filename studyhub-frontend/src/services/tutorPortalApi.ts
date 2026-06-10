import api from './api';

export interface Subject {
  id: number;
  name: string;
}

export interface JobPosting {
  id: number;
  title: string;
  subject: string;
  learningMode: string;
  location: string;
  schedule: string;
  pricePerSession: number;
  parentName: string;
  parentAvatar: string;
  postedAt: string;
  status: string;
}

export interface ClassSession {
  id: number;
  className: string;
  parentName: string;
  schedule: string;
  status: string;
  nextSessionDate: string;
  progress: number;
  pricePerSession: number;
  learningMode: string;
  subject: string;
}

export interface LessonSchedule {
  lessonId: number;
  classId: number;
  className: string;
  parentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  subject: string;
}

export interface CommissionRecord {
  id: number;
  month: string;
  status: string;
  className: string;
  totalSessions: number;
  totalRevenue: number;
  platformFeeAmount: number;
  platformFeePercent: number;
  dueDate: string;
  qrCodeUrl: string;
}

export interface Review {
  id: number;
  parentName: string;
  parentAvatar: string;
  rating: number;
  comment: string;
  className: string;
  createdAt: string;
}

export interface TutorPost {
  id: number;
  title: string;
  subjectName: string;
  teachingMethod: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  schedule: string;
  location: string;
}

export const tutorPortalApi = {
  getApplications: async (): Promise<any[]> => {
    const res = await api.get('/tutor-portal/applications');
    return res.data;
  },
  getSubjects: async (): Promise<Subject[]> => {
    const res = await api.get('/tutor-portal/subjects');
    return res.data;
  },
  getJobPostings: async (filters: { subjects?: string[], learningMode?: string, minPrice?: number, maxPrice?: number, sortBy?: string }): Promise<JobPosting[]> => {
    const params = new URLSearchParams();
    if (filters.subjects && filters.subjects.length > 0) filters.subjects.forEach(s => params.append('subjects', s));
    if (filters.learningMode) params.append('learningMode', filters.learningMode);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    
    const res = await api.get(`/tutor-portal/job-postings?${params.toString()}`);
    return res.data;
  },
  getJobPostingById: async (id: number): Promise<JobPosting> => {
    const res = await api.get(`/tutor-portal/job-postings/${id}`);
    return res.data;
  },
  applyForJob: async (id: number, message: string): Promise<void> => {
    await api.post(`/tutor-portal/job-postings/${id}/apply`, { message });
  },
  getClasses: async (): Promise<ClassSession[]> => {
    const res = await api.get('/tutor-portal/classes');
    return res.data;
  },
  getSchedule: async (startDate?: string, endDate?: string): Promise<LessonSchedule[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const res = await api.get(`/tutor-portal/schedule?${params.toString()}`);
    return res.data;
  },
  getBilling: async (): Promise<CommissionRecord[]> => {
    const res = await api.get('/tutor-portal/billing');
    return res.data;
  },
  markAttendance: async (classId: number): Promise<any> => {
    const res = await api.post(`/tutor-portal/classes/${classId}/attendance`);
    return res.data;
  },
  markLessonAttendance: async (lessonId: number): Promise<any> => {
    const res = await api.post(`/tutor-portal/lessons/${lessonId}/attendance`);
    return res.data;
  },
  requestScheduleChange: async (lessonId: number): Promise<any> => {
    const res = await api.post(`/tutor-portal/lessons/${lessonId}/request-change`);
    return res.data;
  },
  createCourse: async (data: { title: string, subjectId?: number, teachingMethod: string, pricePerSession: number, description: string, image?: string, schedule?: string, location?: string }): Promise<any> => {
    const res = await api.post('/tutor-portal/courses', data);
    return res.data;
  },
  getReviews: async (): Promise<Review[]> => {
    const res = await api.get('/tutor-portal/reviews');
    return res.data;
  },
  getMyPosts: async (): Promise<TutorPost[]> => {
    const res = await api.get('/tutor-portal/my-posts');
    return res.data;
  },
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/tutor-portal/my-posts/${id}`);
  }
};
