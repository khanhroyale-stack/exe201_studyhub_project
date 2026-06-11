import api from './api';

export interface Subject {
  id: number;
  name: string;
}

export interface Tutor {
  id: number;
  fullName: string;
  avatarUrl: string;
  universityName: string;
  major: string;
  introduction: string;
  price: number;
  teachingMethod: string;
  averageRating: number;
  totalReviews: number;
  subjects: Subject[];
}

export interface PageResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface TutorFilterParams {
  keyword?: string;
  subjectIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  teachingMethod?: string;
  sortBy?: string;
  page?: number;
  size?: number;
}

export const tutorApi = {
  getSubjects: async (): Promise<Subject[]> => {
    const response = await api.get('/subjects');
    return response.data;
  },

  getTutors: async (params: TutorFilterParams): Promise<PageResponse<Tutor>> => {
    const searchParams = new URLSearchParams();
    
    if (params.keyword) searchParams.append('keyword', params.keyword);
    if (params.subjectIds && params.subjectIds.length > 0) {
      // Axios or Spring might expect subjectIds=1,2 or subjectIds=1&subjectIds=2
      params.subjectIds.forEach(id => searchParams.append('subjectIds', id.toString()));
    }
    if (params.minPrice !== undefined) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.minRating !== undefined) searchParams.append('minRating', params.minRating.toString());
    if (params.teachingMethod && params.teachingMethod !== 'ALL') searchParams.append('teachingMethod', params.teachingMethod);
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.page !== undefined) searchParams.append('page', params.page.toString());
    if (params.size !== undefined) searchParams.append('size', params.size.toString());

    const response = await api.get(`/tutors?${searchParams.toString()}`);
    return response.data;
  },

  getTutorById: async (id: number): Promise<Tutor> => {
    const response = await api.get(`/tutors/${id}`);
    return response.data;
  }
};
