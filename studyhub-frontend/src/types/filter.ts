export interface ClassFilterParams {
  keyword: string;
  subjects: string[];
  maxPrice: number;
  learningMode: string; // 'Online' | 'Offline' | 'All'
  grades: string[];
  sortBy: string;
  location?: string;
}

export interface TutorFilterParams {
  keyword: string;
  subjects: string[];
  maxPrice: number;
  minRating: number;
  learningMode: string; // 'Online' | 'Offline' | 'All'
  sortBy: string;
  location?: string;
}
